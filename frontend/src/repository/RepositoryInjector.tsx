import { ApiDataRepository } from "./ApiDataRepository";
import { IDataRepository } from "./IDataRepository";
import { MockDataRepository } from "./MockDataRepository";


class RepositoryInjector {
    useMock: boolean = false;
    apiDataRepository: ApiDataRepository = new ApiDataRepository();
    mockDataRepository: MockDataRepository = new MockDataRepository();

    injectRepository() : IDataRepository {
        if (this.useMock) {
            return this.mockDataRepository;
        } else {
            return this.apiDataRepository;
        }
    }

}

export var RepositorySingleton = (
    function () {
        var instance: RepositoryInjector;
        function createInstance() {
            var object = new RepositoryInjector();
            return object;
        }

        return {
            getInstance: function () {
                if (!instance) {
                    instance = createInstance();
                }
                return instance;
            }
        };
    }
)();