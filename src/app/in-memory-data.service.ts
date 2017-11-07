import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const stacks = [
      {
        id: 1,
        title: 'conjunctions',
        cards: ['for', 'and', 'nor', 'but', 'or', 'yet', 'so'],
        categoryId: 0
      },
      {
        id: 2,
        title: 'helping verbs 1',
        cards: ['am', 'are', 'be', 'being', 'been', 'can', 'could'],
        categoryId: 1
      },
      {
        id: 3,
        title: 'helping verbs 2',
        cards: ['do', 'does', 'did', 'has', 'have', 'had', 'is', 'may', 'might', 'must', 'shall', 'should'],
        categoryId: 2
      },
      {
        id: 4,
        title: 'helping verbs 3',
        cards: ['was', 'were', 'will', 'would'],
        categoryId: 2
      }
    ];
    return { stacks };
  }
}
