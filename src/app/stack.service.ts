import { Stack } from './stack';
import { STACKS } from './mock-stacks';

import { Injectable } from '@angular/core';

@Injectable()
export class StackService {
    getStacks(): Promise<Stack[]> {
        return Promise.resolve(STACKS);
    }

    getStack(title: string): Promise<Stack> {
        return this.getStacks()
                .then(stacks => stacks.find(stack => stack.title === title));
    }
}