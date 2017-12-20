import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const cards = [
      { content: 'I', id: 0 },
      { content: 'like', id: 1 },
      { content: 'do', id: 2 },
      { content: 'to', id: 3 },
      { content: 'you', id: 4 },
      { content: 'he', id: 5 },
      { content: 'can', id: 6 },
      { content: 'go', id: 7 },
      { content: 'a', id: 8 },
      { content: 'has', id: 9 },
      { content: 'this', id: 10 },
      { content: 'is', id: 11 },
      { content: 'my', id: 12 },
      { content: 'look', id: 13 },
      { content: 'little', id: 14 },
      { content: 'where', id: 15 },
      { content: 'here', id: 16 },
      { content: 'play', id: 17 },
      { content: 'the', id: 18 },
      { content: 'we', id: 19 },
      { content: 'are', id: 20 },
      { content: 'me', id: 21 },
      { content: 'she', id: 22 },
      { content: 'with', id: 23 },
      { content: 'for', id: 24 },
      { content: 'and', id: 25 },
      { content: 'have', id: 26 },
      { content: 'see', id: 27 },
      { content: 'said', id: 28 },
      { content: 'was', id: 29 },
      { content: 'does', id: 30 },
      { content: 'not', id: 31 },
      { content: 'school', id: 32 },
      { content: 'what', id: 33 },
      { content: 'down', id: 34 },
      { content: 'out', id: 35 },
      { content: 'up', id: 36 },
      { content: 'very', id: 37 },
      { content: 'be', id: 38 },
      { content: 'come', id: 39 },
      { content: 'good', id: 40 },
      { content: 'pull', id: 41 },
      { content: 'fun', id: 42 },
      { content: 'make', id: 43 },
      { content: 'they', id: 44 },
      { content: 'too', id: 45 },
      { content: 'jump', id: 46 },
      { content: 'move', id: 47 },
      { content: 'run', id: 48 },
      { content: 'two', id: 49 },
      { content: 'again', id: 50 },
      { content: 'help', id: 51 },
      { content: 'new', id: 52 },
      { content: 'there', id: 53 },
      { content: 'use', id: 54 },
      { content: 'could', id: 55 },
      { content: 'live', id: 56 },
      { content: 'one', id: 57 },
      { content: 'then', id: 58 },
      { content: 'three', id: 59 }
    ];
    const cardsToStacks = [
      { cardId: 0, stackId: 5 },
      { cardId: 1, stackId: 5 },
      { cardId: 2, stackId: 5 },
      { cardId: 3, stackId: 5 },
      { cardId: 4, stackId: 5 },
      { cardId: 5, stackId: 5 },
      { cardId: 6, stackId: 5 },
      { cardId: 7, stackId: 5 },
      { cardId: 8, stackId: 5 },
      { cardId: 9, stackId: 5 },
      { cardId: 10, stackId: 6 },
      { cardId: 11, stackId: 6 },
      { cardId: 12, stackId: 6 },
      { cardId: 13, stackId: 6 },
      { cardId: 14, stackId: 6 },
      { cardId: 15, stackId: 6 },
      { cardId: 16, stackId: 6 },
      { cardId: 17, stackId: 6 },
      { cardId: 18, stackId: 6 },
      { cardId: 19, stackId: 6 },
      { cardId: 20, stackId: 7 },
      { cardId: 21, stackId: 7 },
      { cardId: 22, stackId: 7 },
      { cardId: 23, stackId: 7 },
      { cardId: 24, stackId: 7 },
      { cardId: 25, stackId: 7 },
      { cardId: 26, stackId: 7 },
      { cardId: 27, stackId: 7 },
      { cardId: 28, stackId: 7 },
      { cardId: 29, stackId: 7 },
      { cardId: 30, stackId: 8 },
      { cardId: 31, stackId: 8 },
      { cardId: 32, stackId: 8 },
      { cardId: 33, stackId: 8 },
      { cardId: 34, stackId: 9 },
      { cardId: 35, stackId: 9 },
      { cardId: 36, stackId: 9 },
      { cardId: 37, stackId: 9 },
      { cardId: 38, stackId: 10 },
      { cardId: 39, stackId: 10 },
      { cardId: 40, stackId: 10 },
      { cardId: 41, stackId: 10 },
      { cardId: 42, stackId: 11 },
      { cardId: 43, stackId: 11 },
      { cardId: 44, stackId: 11 },
      { cardId: 45, stackId: 11 },
      { cardId: 46, stackId: 12 },
      { cardId: 47, stackId: 12 },
      { cardId: 48, stackId: 12 },
      { cardId: 49, stackId: 12 },
      { cardId: 50, stackId: 13 },
      { cardId: 51, stackId: 13 },
      { cardId: 52, stackId: 13 },
      { cardId: 53, stackId: 13 },
      { cardId: 54, stackId: 13 },
      { cardId: 55, stackId: 14 },
      { cardId: 56, stackId: 14 },
      { cardId: 57, stackId: 14 },
      { cardId: 58, stackId: 14 },
      { cardId: 59, stackId: 14 }
    ];

    const stacks = [
      {
        id: 5,
        categoryId: 0,
        name: 'Week 1',
        cards: ['I', 'like', 'do', 'to', 'you', 'he', 'can', 'go', 'a', 'has']
      },
      {
        id: 6,
        categoryId: 0,
        name: 'Week 2',
        cards: [
          'this',
          'is',
          'my',
          'look',
          'little',
          'where',
          'here',
          'play',
          'the',
          'we'
        ]
      },
      {
        id: 7,
        categoryId: 0,
        name: 'Week 3',
        cards: [
          'are',
          'me',
          'she',
          'with',
          'for',
          'and',
          'have',
          'see',
          'said',
          'was'
        ]
      },
      {
        id: 8,
        categoryId: 1,
        name: 'Week 1',
        cards: ['does', 'not', 'school', 'what']
      },
      {
        id: 9,
        categoryId: 1,
        name: 'Week 2',
        cards: ['down', 'out', 'up', 'very']
      },
      {
        id: 10,
        categoryId: 1,
        name: 'Week 3',
        cards: ['be', 'come', 'good', 'pull'],
        fontColor: '#029AB7'
      },
      {
        id: 11,
        categoryId: 1,
        name: 'Week 4',
        cards: ['fun', 'make', 'they', 'too'],
        backgroundColor: '#F0B3C4'
      },
      {
        id: 12,
        categoryId: 1,
        name: 'Week 5',
        cards: ['jump', 'move', 'run', 'two'],
        fontColor: '#950226',
        backgroundColor: '#FF42AA'
      },
      {
        id: 13,
        categoryId: 2,
        name: 'Week 1',
        cards: ['again', 'help', 'new', 'there', 'use']
      },
      {
        id: 14,
        categoryId: 2,
        name: 'Week 2',
        cards: ['could', 'live', 'one', 'then', 'three']
      },
      {
        id: 15,
        categoryId: 2,
        name: 'Week 3',
        cards: ['eat', 'no', 'of', 'under', 'who']
      },
      {
        id: 16,
        categoryId: 2,
        name: 'Week 4',
        cards: ['all', 'call', 'day', 'her', 'want']
      },
      {
        id: 17,
        categoryId: 2,
        name: 'Week 5',
        cards: ['around', 'by', 'many', 'place', 'walk']
      },
      {
        id: 18,
        categoryId: 3,
        name: 'Week 1',
        cards: ['away', 'now', 'some', 'today', 'way', 'why']
      },
      {
        id: 19,
        categoryId: 3,
        name: 'Week 2',
        cards: ['green', 'grow', 'pretty', 'should', 'together', 'water']
      },
      {
        id: 20,
        categoryId: 3,
        name: 'Week 3',
        cards: ['any', 'from', 'happy', 'once', 'so', 'upon']
      },
      {
        id: 21,
        categoryId: 3,
        name: 'Week 4',
        cards: ['ago', 'boy', 'girl', 'how', 'old', 'people']
      },
      {
        id: 22,
        categoryId: 3,
        name: 'Week 5',
        cards: ['after', 'buy', 'done', 'every', 'soon', 'work']
      },
      {
        id: 23,
        categoryId: 4,
        name: 'Week 1',
        cards: ['about', 'animal', 'carry', 'eight', 'give', 'our']
      },
      {
        id: 24,
        categoryId: 4,
        name: 'Week 2',
        cards: ['because', 'blue', 'into', 'or', 'other', 'small']
      },
      {
        id: 25,
        categoryId: 4,
        name: 'Week 3',
        cards: ['find', 'food', 'more', 'over', 'start', 'warm']
      },
      {
        id: 26,
        categoryId: 4,
        name: 'Week 4',
        cards: ['caught', 'flew', 'know', 'laugh', 'listen', 'were']
      }
    ];
    const categories = [
      {
        id: 0,
        name: 'Start Smart',
        defaultBackgroundColor: '#FFBF29',
        defaultFontColor: '#000000'
      },
      {
        id: 1,
        name: 'Unit 1',
        defaultBackgroundColor: '#FFED29',
        defaultFontColor: '#000000'
      },
      {
        id: 2,
        name: 'Unit 2',
        defaultBackgroundColor: '#6FFF47',
        defaultFontColor: '#000000'
      },
      {
        id: 3,
        name: 'Unit 3',
        defaultBackgroundColor: '#42FFD9',
        defaultFontColor: '#000000'
      },
      {
        id: 4,
        name: 'Unit 4',
        defaultBackgroundColor: '#3D6EFF',
        defaultFontColor: '#000000'
      },
      {
        id: 5,
        name: 'Unit 5',
        defaultBackgroundColor: '#C23DFF',
        defaultFontColor: '#000000'
      }
    ];

    return { categories, stacks };
  }
}
