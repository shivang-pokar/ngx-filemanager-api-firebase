import { __awaiter } from "tslib";
import { VError } from 'verror';
import { perms } from '../../permissions';
import { storage } from '../../utils/storage-helper';
export function GetList(bucket, inputDirectoryPath, claims, isAdmin) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const resFiles = yield storage.GetListWithoutPermissions(bucket, inputDirectoryPath);
            if (isAdmin) {
                return resFiles;
            }
            const filesAllowed = resFiles.filter(f => {
                return perms.queries.TryCheckFileAccess(f.permissions, claims, 'read');
            });
            return filesAllowed;
        }
        catch (error) {
            throw new VError(error);
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZVJvb3QiOiIvVm9sdW1lcy9TaGl2YW5nL1BpIFNvZnR3YXJlL2ZpbGUtbWFuYWdlci9uZ3gtZmlsZW1hbmFnZXIvcHJvamVjdHMvbmd4LWZpbGVtYW5hZ2VyLWFwaS1maXJlYmFzZS9zcmMvIiwic291cmNlcyI6WyJsaWIvYXBpL2NvbW1hbmRzL2xpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDaEMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRTFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUVyRCxNQUFNLFVBQWdCLE9BQU8sQ0FDM0IsTUFBYyxFQUNkLGtCQUEwQixFQUMxQixNQUFrQyxFQUNsQyxPQUFpQjs7UUFFakIsSUFBSTtZQUNGLE1BQU0sUUFBUSxHQUFHLE1BQU0sT0FBTyxDQUFDLHlCQUF5QixDQUN0RCxNQUFNLEVBQ04sa0JBQWtCLENBQ25CLENBQUM7WUFDRixJQUFJLE9BQU8sRUFBRTtnQkFDWCxPQUFPLFFBQVEsQ0FBQzthQUNqQjtZQUNELE1BQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3ZDLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztZQUN6RSxDQUFDLENBQUMsQ0FBQztZQUNILE9BQU8sWUFBWSxDQUFDO1NBQ3JCO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxNQUFNLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQztDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQnVja2V0IH0gZnJvbSAnLi4vLi4vdHlwZXMvZ29vZ2xlLWNsb3VkLXR5cGVzJztcbmltcG9ydCB7IFZFcnJvciB9IGZyb20gJ3ZlcnJvcic7XG5pbXBvcnQgeyBwZXJtcyB9IGZyb20gJy4uLy4uL3Blcm1pc3Npb25zJztcbmltcG9ydCB7IENvcmVUeXBlcyB9IGZyb20gJy4uLy4uL3R5cGVzJztcbmltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tICcuLi8uLi91dGlscy9zdG9yYWdlLWhlbHBlcic7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHZXRMaXN0KFxuICBidWNrZXQ6IEJ1Y2tldCxcbiAgaW5wdXREaXJlY3RvcnlQYXRoOiBzdHJpbmcsXG4gIGNsYWltczogQ29yZVR5cGVzLlVzZXJDdXN0b21DbGFpbXMsXG4gIGlzQWRtaW4/OiBib29sZWFuXG4pOiBQcm9taXNlPENvcmVUeXBlcy5SZXNGaWxlW10+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNGaWxlcyA9IGF3YWl0IHN0b3JhZ2UuR2V0TGlzdFdpdGhvdXRQZXJtaXNzaW9ucyhcbiAgICAgIGJ1Y2tldCxcbiAgICAgIGlucHV0RGlyZWN0b3J5UGF0aFxuICAgICk7XG4gICAgaWYgKGlzQWRtaW4pIHtcbiAgICAgIHJldHVybiByZXNGaWxlcztcbiAgICB9XG4gICAgY29uc3QgZmlsZXNBbGxvd2VkID0gcmVzRmlsZXMuZmlsdGVyKGYgPT4ge1xuICAgICAgcmV0dXJuIHBlcm1zLnF1ZXJpZXMuVHJ5Q2hlY2tGaWxlQWNjZXNzKGYucGVybWlzc2lvbnMsIGNsYWltcywgJ3JlYWQnKTtcbiAgICB9KTtcbiAgICByZXR1cm4gZmlsZXNBbGxvd2VkO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHRocm93IG5ldyBWRXJyb3IoZXJyb3IpO1xuICB9XG59XG4iXX0=