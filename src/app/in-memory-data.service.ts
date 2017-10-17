import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const stacks = [
            { id: 1, title: 'conjunctions', cards: ['for', 'and', 'nor', 'but', 'or', 'yet', 'so'] },
            { id: 2, title: 'helping verbs 1', cards: ['am', 'are', 'be', 'being', 'been', 'can', 'could'] },
            { id: 3, title: 'helping verbs 2', cards: ['do', 'does', 'did', 'has', 'have', 'had', 'is', 'may', 'might', 'must', 'shall', 'should'] },
            { id: 4, title: 'helping verbs 3', cards: ['was', 'were', 'will', 'would'] }
        ];
        return {stacks};
    }
}