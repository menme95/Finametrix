import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxMetadataComponent } from './box-metadata.component';

describe('BoxMetadataComponent', () => {
  let component: BoxMetadataComponent;
  let fixture: ComponentFixture<BoxMetadataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxMetadataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
