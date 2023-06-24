import { __awaiter } from "tslib";
import { getResultFromArray } from '../../utils/translation-helpers';
import * as path from 'path';
import { VError } from 'verror';
import { paths } from '../../utils/paths';
import { storage } from '../../utils/storage-helper';
export function copyWithChildren(bucket, itemPath, newFolderPrefix) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const oldFolderPrefix = paths.EnsureNoPrefixSlash(path.dirname(itemPath));
            const allChildren = yield storage.GetAllChildrenWithPrefix(bucket, itemPath);
            const successArray = yield Promise.all(allChildren.map(f => storage.TryCopyFile(f, oldFolderPrefix, newFolderPrefix)));
            return successArray;
        }
        catch (error) {
            throw new VError(error);
        }
    });
}
export function CopyFiles(bucket, items, newDirectoryPath, claims) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newFolderPrefix = paths.EnsureGoogleStoragePathDir(newDirectoryPath);
            const copyResultsArrArr = yield Promise.all(items.map(filePath => copyWithChildren(bucket, filePath, newFolderPrefix)));
            const copyResultsArr = copyResultsArrArr.reduce((acc, cur) => {
                return acc.concat(cur);
            }, []);
            const results = getResultFromArray(copyResultsArr);
            return results;
        }
        catch (error) {
            throw new VError(error);
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29weS5qcyIsInNvdXJjZVJvb3QiOiIvVm9sdW1lcy9TaGl2YW5nL1BpIFNvZnR3YXJlL2ZpbGUtbWFuYWdlci9uZ3gtZmlsZW1hbmFnZXIvcHJvamVjdHMvbmd4LWZpbGVtYW5hZ2VyLWFwaS1maXJlYmFzZS9zcmMvIiwic291cmNlcyI6WyJsaWIvYXBpL2NvbW1hbmRzL2NvcHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3JFLE9BQU8sS0FBSyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBRTdCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDaEMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUVyRCxNQUFNLFVBQWdCLGdCQUFnQixDQUNwQyxNQUFjLEVBQ2QsUUFBZ0IsRUFDaEIsZUFBdUI7O1FBRXZCLElBQUk7WUFDRixNQUFNLGVBQWUsR0FBRyxLQUFLLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzFFLE1BQU0sV0FBVyxHQUFHLE1BQU0sT0FBTyxDQUFDLHdCQUF3QixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztZQUM3RSxNQUFNLFlBQVksR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQ3BDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxlQUFlLEVBQUUsZUFBZSxDQUFDLENBQUMsQ0FDL0UsQ0FBQztZQUNGLE9BQU8sWUFBWSxDQUFDO1NBQ3JCO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxNQUFNLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQztDQUFBO0FBRUQsTUFBTSxVQUFnQixTQUFTLENBQzdCLE1BQWMsRUFDZCxLQUFlLEVBQ2YsZ0JBQXdCLEVBQ3hCLE1BQWtDOztRQUVsQyxJQUFJO1lBQ0YsTUFBTSxlQUFlLEdBQUcsS0FBSyxDQUFDLDBCQUEwQixDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDM0UsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQ3pDLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQzNFLENBQUM7WUFDRixNQUFNLGNBQWMsR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7Z0JBQzNELE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN6QixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDUCxNQUFNLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUNuRCxPQUFPLE9BQU8sQ0FBQztTQUNoQjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsTUFBTSxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN6QjtJQUNILENBQUM7Q0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJ1Y2tldCB9IGZyb20gJy4uLy4uL3R5cGVzL2dvb2dsZS1jbG91ZC10eXBlcyc7XG5pbXBvcnQgeyBnZXRSZXN1bHRGcm9tQXJyYXkgfSBmcm9tICcuLi8uLi91dGlscy90cmFuc2xhdGlvbi1oZWxwZXJzJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBDb3JlVHlwZXMgfSBmcm9tICcuLi8uLi90eXBlcyc7XG5pbXBvcnQgeyBWRXJyb3IgfSBmcm9tICd2ZXJyb3InO1xuaW1wb3J0IHsgcGF0aHMgfSBmcm9tICcuLi8uLi91dGlscy9wYXRocyc7XG5pbXBvcnQgeyBzdG9yYWdlIH0gZnJvbSAnLi4vLi4vdXRpbHMvc3RvcmFnZS1oZWxwZXInO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29weVdpdGhDaGlsZHJlbihcbiAgYnVja2V0OiBCdWNrZXQsXG4gIGl0ZW1QYXRoOiBzdHJpbmcsXG4gIG5ld0ZvbGRlclByZWZpeDogc3RyaW5nXG4pIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBvbGRGb2xkZXJQcmVmaXggPSBwYXRocy5FbnN1cmVOb1ByZWZpeFNsYXNoKHBhdGguZGlybmFtZShpdGVtUGF0aCkpO1xuICAgIGNvbnN0IGFsbENoaWxkcmVuID0gYXdhaXQgc3RvcmFnZS5HZXRBbGxDaGlsZHJlbldpdGhQcmVmaXgoYnVja2V0LCBpdGVtUGF0aCk7XG4gICAgY29uc3Qgc3VjY2Vzc0FycmF5ID0gYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICBhbGxDaGlsZHJlbi5tYXAoZiA9PiBzdG9yYWdlLlRyeUNvcHlGaWxlKGYsIG9sZEZvbGRlclByZWZpeCwgbmV3Rm9sZGVyUHJlZml4KSlcbiAgICApO1xuICAgIHJldHVybiBzdWNjZXNzQXJyYXk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgdGhyb3cgbmV3IFZFcnJvcihlcnJvcik7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIENvcHlGaWxlcyhcbiAgYnVja2V0OiBCdWNrZXQsXG4gIGl0ZW1zOiBzdHJpbmdbXSxcbiAgbmV3RGlyZWN0b3J5UGF0aDogc3RyaW5nLFxuICBjbGFpbXM6IENvcmVUeXBlcy5Vc2VyQ3VzdG9tQ2xhaW1zXG4pIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBuZXdGb2xkZXJQcmVmaXggPSBwYXRocy5FbnN1cmVHb29nbGVTdG9yYWdlUGF0aERpcihuZXdEaXJlY3RvcnlQYXRoKTtcbiAgICBjb25zdCBjb3B5UmVzdWx0c0FyckFyciA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgaXRlbXMubWFwKGZpbGVQYXRoID0+IGNvcHlXaXRoQ2hpbGRyZW4oYnVja2V0LCBmaWxlUGF0aCwgbmV3Rm9sZGVyUHJlZml4KSlcbiAgICApO1xuICAgIGNvbnN0IGNvcHlSZXN1bHRzQXJyID0gY29weVJlc3VsdHNBcnJBcnIucmVkdWNlKChhY2MsIGN1cikgPT4ge1xuICAgICAgcmV0dXJuIGFjYy5jb25jYXQoY3VyKTtcbiAgICB9LCBbXSk7XG4gICAgY29uc3QgcmVzdWx0cyA9IGdldFJlc3VsdEZyb21BcnJheShjb3B5UmVzdWx0c0Fycik7XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgdGhyb3cgbmV3IFZFcnJvcihlcnJvcik7XG4gIH1cbn1cbiJdfQ==