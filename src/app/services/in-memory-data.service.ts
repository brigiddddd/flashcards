import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const categories = [
      {
        id: 0,
        name: 'Start Smart',
        backgroundColor: 'red',
        fontColor: 'black',
        stacks: [
          {
            id: 5,
            name: 'Week 1',
            cards: ['I', 'like', 'do', 'to', 'you', 'he', 'can', 'go', 'a', 'has'],

          }, {
            id: 6,
            name: 'Week 2',
            cards: ['this', 'is', 'my', 'look', 'little', 'where', 'here', 'play', 'the', 'we'],

          }, {
            id: 7,
            name: 'Week 3',
            cards: ['are', 'me', 'she', 'with', 'for', 'and', 'have', 'see', 'said', 'was'],

          }
        ]
      }, {
        id: 1,
        name: 'Unit 1',
        backgroundColor: 'orange',
        fontColor: 'black',
        stacks: [
          {
            id: 8,
            name: 'Week 1',
            cards: ['does', 'not', 'school', 'what'],
            categoryId: 2
          }, {
            id: 9,
            name: 'Week 2',
            cards: ['down', 'out', 'up', 'very'],
            categoryId: 2
          }, {
            id: 10,
            name: 'Week 3',
            cards: ['be', 'come', 'good', 'pull'],
            categoryId: 2
          }, {
            id: 11,
            name: 'Week 4',
            cards: ['fun', 'make', 'they', 'too'],
            categoryId: 2
          }, {
            id: 12,
            name: 'Week 5',
            cards: ['jump', 'move', 'run', 'two'],
            categoryId: 2
          }
        ]
      }, {
        id: 2,
        name: 'Unit 2',
        backgroundColor: 'yellow',
        fontColor: 'black',
        stacks: [
          {
            id: 13,
            name: 'Week 1',
            cards: ['again', 'help', 'new', 'there', 'use']
          }, {
            id: 14,
            name: 'Week 2',
            cards: ['could', 'live', 'one', 'then', 'three']
          }, {
            id: 15,
            name: 'Week 3',
            cards: ['eat', 'no', 'of', 'under', 'who']
          }, {
            id: 16,
            name: 'Week 4',
            cards: ['all', 'call', 'day', 'her', 'want']
          }, {
            id: 17,
            name: 'Week 5',
            cards: ['around', 'by', 'many', 'place', 'walk']
          }
        ]
      }, {
        id: 3,
        name: 'Unit 3',
        backgroundColor: 'green',
        fontColor: 'black',
        stacks: [
          {
            id: 18,
            name: 'Week 1',
            cards: ['away', 'now', 'some', 'today', 'way', 'why']
          }, {
            id: 19,
            name: 'Week 2',
            cards: ['green', 'grow', 'pretty', 'should', 'together', 'water']
          }, {
            id: 20,
            name: 'Week 3',
            cards: ['any', 'from', 'happy', 'once', 'so', 'upon']
          }, {
            id: 21,
            name: 'Week 4',
            cards: ['ago', 'boy', 'girl', 'how', 'old', 'people']
          }, {
            id: 22,
            name: 'Week 5',
            cards: ['after', 'buy', 'done', 'every', 'soon', 'work']
          }
        ]
      }, {
        id: 4,
        name: 'Unit 4',
        backgroundColor: 'blue',
        fontColor: 'black',
        stacks: [
          {
            id: 23,
            name: 'Week 1',
            cards: ['about', 'animal', 'carry', 'eight', 'give', 'our']
          }, {
            id: 24,
            name: 'Week 2',
            cards: ['because', 'blue', 'into', 'or', 'other', 'small']
          }, {
            id: 25,
            name: 'Week 3',
            cards: ['find', 'food', 'more', 'over', 'start', 'warm']
          }, {
            id: 26,
            name: 'Week 4',
            cards: ['caught', 'flew', 'know', 'laugh', 'listen', 'were']
          }
        ]
      }];

    return { categories };
  }
}
