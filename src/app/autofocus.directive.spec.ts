import { AutofocusDirective } from './autofocus.directive';
import { ElementRef } from '@angular/core';

export class MockElementRef extends ElementRef {
  constructor() { super(null); }
}

describe('AutofocusDirective', () => {
  it('should create an instance', () => {
    //TODO!
    const directive = new AutofocusDirective(new MockElementRef);
    expect(directive).toBeTruthy();
  });
});
