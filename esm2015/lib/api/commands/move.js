import { __awaiter } from "tslib";
import { ResultsObjFromArray } from '../../utils/translation-helpers';
import * as path from 'path';
import { VError } from 'verror';
import { paths } from '../../utils/paths';
import { storage } from '../../utils/storage-helper';
export function moveWithChildren(bucket, itemPath, newFolderPrefix) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const oldFolderPrefix = paths.EnsureNoPrefixSlash(path.dirname(itemPath));
            const allChildren = yield storage.GetAllChildrenWithPrefix(bucket, itemPath);
            const successArray = yield Promise.all(allChildren.map(f => storage.TryRenameFile(f, oldFolderPrefix, newFolderPrefix)));
            return successArray;
        }
        catch (error) {
            throw new VError(error);
        }
    });
}
export function MoveFiles(bucket, items, newDirectoryPath, claims) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newFolderPrefix = paths.EnsureGoogleStoragePathDir(newDirectoryPath);
            const moveResultsArrArr = yield Promise.all(items.map(filePath => moveWithChildren(bucket, filePath, newFolderPrefix)));
            const moveResultsArr = moveResultsArrArr.reduce((acc, cur) => {
                return acc.concat(cur);
            }, []);
            return ResultsObjFromArray(moveResultsArr);
        }
        catch (error) {
            throw new VError(error);
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW92ZS5qcyIsInNvdXJjZVJvb3QiOiIvVm9sdW1lcy9TaGl2YW5nL1BpIFNvZnR3YXJlL2ZpbGUtbWFuYWdlci9uZ3gtZmlsZW1hbmFnZXIvcHJvamVjdHMvbmd4LWZpbGVtYW5hZ2VyLWFwaS1maXJlYmFzZS9zcmMvIiwic291cmNlcyI6WyJsaWIvYXBpL2NvbW1hbmRzL21vdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3RFLE9BQU8sS0FBSyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBRTdCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDaEMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUVyRCxNQUFNLFVBQWdCLGdCQUFnQixDQUNwQyxNQUFjLEVBQ2QsUUFBZ0IsRUFDaEIsZUFBdUI7O1FBRXZCLElBQUk7WUFDRixNQUFNLGVBQWUsR0FBRyxLQUFLLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzFFLE1BQU0sV0FBVyxHQUFHLE1BQU0sT0FBTyxDQUFDLHdCQUF3QixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztZQUM3RSxNQUFNLFlBQVksR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQ3BDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBRSxlQUFlLEVBQUUsZUFBZSxDQUFDLENBQUMsQ0FDakYsQ0FBQztZQUNGLE9BQU8sWUFBWSxDQUFDO1NBQ3JCO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxNQUFNLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQztDQUFBO0FBRUQsTUFBTSxVQUFnQixTQUFTLENBQzdCLE1BQWMsRUFDZCxLQUFlLEVBQ2YsZ0JBQXdCLEVBQ3hCLE1BQWtDOztRQUVsQyxJQUFJO1lBQ0YsTUFBTSxlQUFlLEdBQUcsS0FBSyxDQUFDLDBCQUEwQixDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDM0UsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQ3pDLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQzNFLENBQUM7WUFDRixNQUFNLGNBQWMsR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7Z0JBQzNELE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN6QixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDUCxPQUFPLG1CQUFtQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQzVDO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxNQUFNLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQztDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQnVja2V0IH0gZnJvbSAnLi4vLi4vdHlwZXMvZ29vZ2xlLWNsb3VkLXR5cGVzJztcbmltcG9ydCB7IFJlc3VsdHNPYmpGcm9tQXJyYXkgfSBmcm9tICcuLi8uLi91dGlscy90cmFuc2xhdGlvbi1oZWxwZXJzJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBDb3JlVHlwZXMgfSBmcm9tICcuLi8uLi90eXBlcyc7XG5pbXBvcnQgeyBWRXJyb3IgfSBmcm9tICd2ZXJyb3InO1xuaW1wb3J0IHsgcGF0aHMgfSBmcm9tICcuLi8uLi91dGlscy9wYXRocyc7XG5pbXBvcnQgeyBzdG9yYWdlIH0gZnJvbSAnLi4vLi4vdXRpbHMvc3RvcmFnZS1oZWxwZXInO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbW92ZVdpdGhDaGlsZHJlbihcbiAgYnVja2V0OiBCdWNrZXQsXG4gIGl0ZW1QYXRoOiBzdHJpbmcsXG4gIG5ld0ZvbGRlclByZWZpeDogc3RyaW5nXG4pIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBvbGRGb2xkZXJQcmVmaXggPSBwYXRocy5FbnN1cmVOb1ByZWZpeFNsYXNoKHBhdGguZGlybmFtZShpdGVtUGF0aCkpO1xuICAgIGNvbnN0IGFsbENoaWxkcmVuID0gYXdhaXQgc3RvcmFnZS5HZXRBbGxDaGlsZHJlbldpdGhQcmVmaXgoYnVja2V0LCBpdGVtUGF0aCk7XG4gICAgY29uc3Qgc3VjY2Vzc0FycmF5ID0gYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICBhbGxDaGlsZHJlbi5tYXAoZiA9PiBzdG9yYWdlLlRyeVJlbmFtZUZpbGUoZiwgb2xkRm9sZGVyUHJlZml4LCBuZXdGb2xkZXJQcmVmaXgpKVxuICAgICk7XG4gICAgcmV0dXJuIHN1Y2Nlc3NBcnJheTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICB0aHJvdyBuZXcgVkVycm9yKGVycm9yKTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gTW92ZUZpbGVzKFxuICBidWNrZXQ6IEJ1Y2tldCxcbiAgaXRlbXM6IHN0cmluZ1tdLFxuICBuZXdEaXJlY3RvcnlQYXRoOiBzdHJpbmcsXG4gIGNsYWltczogQ29yZVR5cGVzLlVzZXJDdXN0b21DbGFpbXNcbikge1xuICB0cnkge1xuICAgIGNvbnN0IG5ld0ZvbGRlclByZWZpeCA9IHBhdGhzLkVuc3VyZUdvb2dsZVN0b3JhZ2VQYXRoRGlyKG5ld0RpcmVjdG9yeVBhdGgpO1xuICAgIGNvbnN0IG1vdmVSZXN1bHRzQXJyQXJyID0gYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICBpdGVtcy5tYXAoZmlsZVBhdGggPT4gbW92ZVdpdGhDaGlsZHJlbihidWNrZXQsIGZpbGVQYXRoLCBuZXdGb2xkZXJQcmVmaXgpKVxuICAgICk7XG4gICAgY29uc3QgbW92ZVJlc3VsdHNBcnIgPSBtb3ZlUmVzdWx0c0FyckFyci5yZWR1Y2UoKGFjYywgY3VyKSA9PiB7XG4gICAgICByZXR1cm4gYWNjLmNvbmNhdChjdXIpO1xuICAgIH0sIFtdKTtcbiAgICByZXR1cm4gUmVzdWx0c09iakZyb21BcnJheShtb3ZlUmVzdWx0c0Fycik7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgdGhyb3cgbmV3IFZFcnJvcihlcnJvcik7XG4gIH1cbn1cbiJdfQ==