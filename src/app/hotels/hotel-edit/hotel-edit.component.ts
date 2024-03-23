import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, fromEvent, merge, EMPTY, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';

import { IHotel } from '../shared/models/hotel';
import { HotelListService } from '../shared/services/hotel-list.service';
import { NumberValidators } from '../shared/validators/number.validator';
import { GenericGlobalValidator } from '../shared/validators/generic-global.validator';

@Component({
  selector: 'app-hotel-edit',
  templateUrl: './hotel-edit.component.html',
  styleUrls: ['./hotel-edit.component.css']
})
export class HotelEditComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) inputElements: ElementRef[];

  public hotelForm: FormGroup;
  public errorMessage: string;
  public formErrors: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } } = {
    hotelName: {
      required: 'Le nom de l\'hôtel est obligatoire.',
      minlength: 'Le nom de l\'hôtel doit comporter au moins trois caractères.',
      maxlength: 'Le nom de l\'hôtel ne peut pas dépasser 50 caractères.'
    },
    cityName: {
      required: 'Le nom de la ville est obligatoire.',
      //minlength: 'Le nom de l\'hôtel doit comporter au moins trois caractères.',
      //maxlength: 'Le nom de l\'hôtel ne peut pas dépasser 50 caractères.'
    },
    quartier: {
      required: 'Le nom du quartier est obligatoire.',
      minlength: 'Le nom du quartier doit comporter au moins trois caractères.',
      maxlength: 'Le nom du quartier ne peut pas dépasser 50 caractères.'
    },
    type: {
      required: 'Le type de logement est obligatoire.',
      //minlength: 'Le nom de l\'hôtel doit comporter au moins trois caractères.',
      //maxlength: 'Le nom de l\'hôtel ne peut pas dépasser 50 caractères.'
    },
    categorie: {
      required: 'La categorie du logement est obligatoire.',
      //minlength: 'Le nom de l\'hôtel doit comporter au moins trois caractères.',
      //maxlength: 'Le nom de l\'hôtel ne peut pas dépasser 50 caractères.'
    },
    price: {
      required: 'le prix du logement est obligatoire.',
      pattern: 'Veuillez entrer un prix svp.'
    },
    numberOne: {
      required: 'le numéro du logement est obligatoire.',
      pattern: 'Veuillez entrer un numéro svp.'
    },
    numberTwo: {
      required: 'le numéro du logement est obligatoire.',
      pattern: 'Veuillez entrer un numéro svp.'
    },
    imageUrl: {
      required: 'cette image est obligatoire.',
      pattern: 'Veuillez entrer une image svp.'
    },
    imageUrl1: {
      required: 'cette image est obligatoire.',
      pattern: 'Veuillez entrer une image svp.'
    },
    imageUrl2: {
      required: 'cette image est obligatoire.',
      pattern: 'Veuillez entrer une image svp.'
    },
    imageUrl3: {
      required: 'cette image est obligatoire.',
      pattern: 'Veuillez entrer une image svp.'
    },
    imageUrl4: {
      required: 'cette image est obligatoire.',
      pattern: 'Veuillez entrer une image svp.'
    },
    rating: {
      range: 'Donnez une note à l\'hôtel entre 1 (le plus bas) et 5 (le plus élevé).'
    },
    description: {
      required: 'cette description est obligattoire'
    }
  };
  public hotel: IHotel;
  public pageTitle: string;

  private globalGenericValidator: GenericGlobalValidator;
  private isFormSubmitted: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private hotelService: HotelListService

  ) { }


  ngOnInit(): void {
    this.globalGenericValidator = new GenericGlobalValidator(this.validationMessages);

    // first attempt
    // this.formErrors = this.globalGenericValidator.createErrorMessages(this.hotelForm);

    this.hotelForm = this.fb.group({
      hotelName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ]
      ],
      price: [
        '',
        [
          Validators.required,
          Validators.pattern(/^-?(0|[1-9]\d*)?$/)
        ]
      ],
      numberOne: [
        '',
        [
          Validators.required,
          Validators.pattern(/^-?(0|[1-9]\d*)?$/)
        ]
      ],
      numberTwo: [
        '',
        [
          Validators.required,
          Validators.pattern(/^-?(0|[1-9]\d*)?$/)
        ]
      ],
      cityName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ]
      ],
      quartier: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ]
      ],
      type: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ]
      ],
      
      categorie: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ]
      ],
      numerowhatsappOne: [''],
      numerowhatsappTwo: [''],
      imageUrl: [
        '',
        [
          Validators.required,
          //Validators.minLength(3),
          //Validators.maxLength(50)
        ]
      ],
      imageUrl1: [
        '',
        [
          Validators.required,
          //Validators.minLength(3),
          //Validators.maxLength(50)
        ]
      ],
      imageUrl2: [
        '',
        [
          Validators.required,
          //Validators.minLength(3),
          //Validators.maxLength(50)
        ]
      ],
      imageUrl3: [
        '',
        [
          Validators.required,
          //Validators.minLength(3),
          //Validators.maxLength(50)
        ]
      ],
      imageUrl4: [
        '',
        [
          Validators.required,
          //Validators.minLength(3),
          //Validators.maxLength(50)
        ]
      ],
      rating: ['', NumberValidators.range(1, 5)],
      tags: this.fb.array([]),
      description: ['', Validators.required]
      
    });

    this.route.paramMap.subscribe(params => {
      const id = +params.get('id');

     this.getSelectedHotel(id);
    })
    
  }

  
  ngAfterViewInit() {
    // without RxJS => changeDetection Error
    // this.formErrors = this.globalGenericValidator.createErrorMessages(this.hotelForm);

    this.validateForm();
  }

  public hideErrorMessage(): void {
    this.errorMessage = null;
  }

  public getSelectedHotel(id: number): void {
    this.hotelService.getHotelById(id).subscribe({
      next: (hotel: IHotel) => this.displayHotel(hotel),
      error: (err) => this.errorMessage = err
    });
  }

  public displayHotel(hotel: IHotel): void {
    this.hotel = hotel;

    if (this.hotel.id === 0) {
      this.pageTitle = 'Ajouter un logement';
    } else {
      this.pageTitle = `Modifier le logement ${this.hotel.hotelName}`;
    }

    // Convertir les champs numero1 et numero2 en nombres
    // this.hotel.numero1 = +this.hotel.numero1;
    // this.hotel.numero2 = +this.hotel.numero2;

    this.hotelForm.patchValue({
      hotelName: this.hotel.hotelName,
      price: this.hotel.price,
      description: this.hotel.description,
      numberOne: this.hotel.numberOne,
      numberTwo: this.hotel.numberTwo,
      cityName: this.hotel.cityName,
      quartier: this.hotel.quartier,
      type: this.hotel.type,
      categorie: this.hotel.categorie,
      imageUrl: this.hotel.imageUrl,
      imageUrl1: this.hotel.imageUrl1,
      imageUrl2: this.hotel.imageUrl2,
      imageUrl3: this.hotel.imageUrl3,
      imageUrl4: this.hotel.imageUrl4,
      numerowhatsappOne: this.hotel.numerowhatsappOne,
      numerowhatsappTwo: this.hotel.numerowhatsappTwo,
      rating: this.hotel.rating
    });
    this.hotelForm.setControl('tags', this.fb.array(this.hotel.tags || []));
  }

  public get tags(): FormArray {
    return this.hotelForm.get('tags') as FormArray;
  }

  public addTag(): void {
    this.tags.push(new FormControl());
  }

  public deleteTag(index: number): void {
    this.tags.removeAt(index);
    this.tags.markAsDirty();
  }

  public saveHotel(): void {

    this.isFormSubmitted = true;
    this.hotelForm.updateValueAndValidity({
      onlySelf: true,
      emitEvent: true
    });

    if (this.hotelForm.valid) {
      if (this.hotelForm.dirty) {
        const hotel: IHotel = {
          ...this.hotel,
          ...this.hotelForm.value
        };

        // add or edit logic
        if (hotel.id === 0) {
          this.hotelService.createHotel(hotel).subscribe({
            next: () => this.saveCompleted(),
            error: (err) => this.errorMessage = err
          });
        } else {
          this.hotelService.updateHotel(hotel).subscribe({
            next: () => this.saveCompleted(),
            error: (err) => this.errorMessage = err
          });
        }
      } else {
        this.saveCompleted();
      }
    } else {
      this.errorMessage = `Corrigez les erreurs svp.`;
    }
  }

  public deleteHotel(): void {

    if (this.hotel.id === 0) {
      this.saveCompleted();
    } else {
      if (confirm(`Voulez-vous réelement supprimer ${this.hotel.hotelName} ?`)) {
        this.hotelService.deleteHotel(this.hotel.id).subscribe({
          next: () => this.saveCompleted(),
          error: (err) => this.errorMessage = err
        });
      }
    }

  }


  public saveCompleted(): void {
    this.hotelForm.reset();
    this.router.navigate(['/logements']);
  }

  public validateForm(): void {
    const formControlBlurs: Observable<unknown>[] = this.inputElements
      .map((formControlElemRef: ElementRef) => fromEvent(formControlElemRef.nativeElement, 'blur'));

    merge(this.hotelForm.valueChanges, ...formControlBlurs).pipe(
      // debounceTime(300)
      debounce(() => this.isFormSubmitted ? EMPTY : timer(300))
    ).subscribe(() => {
      this.formErrors = this.globalGenericValidator.createErrorMessages(this.hotelForm, this.isFormSubmitted);
      console.log('value on subscribe errors: ', this.formErrors);
    });
  }

}
