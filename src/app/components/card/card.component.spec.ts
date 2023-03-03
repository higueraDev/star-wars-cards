import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../material/material.module';

import { CardComponent } from './card.component';
import { generatePeopleCard } from '../../mocks/card';
import { By } from '@angular/platform-browser';
import { PeopleCard } from '../../models/people-card';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent],
      imports: [MaterialModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.card = generatePeopleCard();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title on people card', () => {
    const expectedName = component.card.title;
    const titleDebug = fixture.debugElement.query(By.css('mat-card-title'));
    const titleElement = titleDebug.nativeElement;

    fixture.detectChanges();

    expect(titleElement.textContent).toContain(expectedName);
  });

  it('should display the mass on people card', () => {
    const peopleCard = component.card as PeopleCard;
    const expectedProperty = peopleCard.content.mass;
    const propertiesOnDebug = fixture.debugElement.queryAll(By.css('p'));
    const propertyOnDebug = propertiesOnDebug.find((e) => {
      const regex = new RegExp(/Mass/);
      return e.nativeElement.textContent.match(regex) !== null;
    });
    const propertyElement = propertyOnDebug?.nativeElement;

    fixture.detectChanges();

    expect(propertyElement.textContent).toContain(expectedProperty);
  });
});
