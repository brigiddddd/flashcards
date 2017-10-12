import { Component } from '@angular/core';
import { Stack } from './stack';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'flashcards';
  stacks = STACKS;
  selectedStack: Stack;

  onSelect(stack: Stack): void {
    this.selectedStack = stack;
  }
}

const STACKS: Stack[] = [
  {
    title: 'conjunctions',
    cards: ['for','and','nor','but','or','yet','so']
  },
  {
    title: 'helping verbs 1',
    cards: ['am','are','be','being','been','can','could']
  },
  {
    title: 'helping verbs 2',
    cards: ['do', 'does', 'did','has','have','had','is','may','might','must','shall','should']
  },
  {
    title: 'helping verbs 3',
    cards: ['was','were','will','would']
  },
]