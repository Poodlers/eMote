import { ApiDataRepository } from "./ApiDataRepository";
import { IDataRepository } from "./IDataRepository";
import { MockDataRepository } from "./MockDataRepository";


export class RepositoryInjector {
    useMock: boolean = false;

    injectRepository() : IDataRepository {
        if (this.useMock) {
            return new MockDataRepository();
        } else {
            return new ApiDataRepository();
        }
    }

}