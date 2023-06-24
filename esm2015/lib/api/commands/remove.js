import { __awaiter } from "tslib";
import { VError } from 'verror';
import { paths } from '../../utils/paths';
import { storage } from '../../utils/storage-helper';
export function tryDeleteFile(file) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [exists] = yield file.exists();
            if (exists) {
                console.log('- deleting file: ', file.name);
                yield file.delete();
                return true;
            }
            return false;
        }
        catch (error) {
            throw new VError(error);
        }
    });
}
export function RemoveFileWithChildren(bucket, itemPath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allChildren = yield storage.GetAllChildrenWithPrefix(bucket, itemPath);
            const successArray = yield Promise.all(allChildren.map(f => tryDeleteFile(f)));
            const allSuccesses = successArray.reduce((acc, cur) => (acc = acc && cur), true);
            return allSuccesses;
        }
        catch (error) {
            throw new VError(error);
        }
    });
}
export function RemoveFiles(bucket, items, claims) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const googleStorageItemPaths = items.map(p => paths.EnsureNoPrefixSlash(p));
            const successArray = yield Promise.all(googleStorageItemPaths.map(itemPath => RemoveFileWithChildren(bucket, itemPath)));
            const allSuccesses = successArray.reduce((acc, cur) => (acc = acc && cur), true);
            const results = {
                success: allSuccesses
            };
            return results;
        }
        catch (error) {
            throw new VError(error);
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3ZlLmpzIiwic291cmNlUm9vdCI6Ii9Wb2x1bWVzL1NoaXZhbmcvUGkgU29mdHdhcmUvZmlsZS1tYW5hZ2VyL25neC1maWxlbWFuYWdlci9wcm9qZWN0cy9uZ3gtZmlsZW1hbmFnZXItYXBpLWZpcmViYXNlL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9hcGkvY29tbWFuZHMvcmVtb3ZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ2hDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUUxQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFckQsTUFBTSxVQUFnQixhQUFhLENBQUMsSUFBVTs7UUFDNUMsSUFBSTtZQUNGLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNyQyxJQUFJLE1BQU0sRUFBRTtnQkFDVixPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDNUMsTUFBTSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ3BCLE9BQU8sSUFBSSxDQUFDO2FBQ2I7WUFDRCxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxNQUFNLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQztDQUFBO0FBRUQsTUFBTSxVQUFnQixzQkFBc0IsQ0FDMUMsTUFBYyxFQUNkLFFBQWdCOztRQUVoQixJQUFJO1lBQ0YsTUFBTSxXQUFXLEdBQUcsTUFBTSxPQUFPLENBQUMsd0JBQXdCLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQzdFLE1BQU0sWUFBWSxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FDcEMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUN2QyxDQUFDO1lBQ0YsTUFBTSxZQUFZLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FDdEMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEVBQ2hDLElBQUksQ0FDTCxDQUFDO1lBQ0YsT0FBTyxZQUFZLENBQUM7U0FDckI7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE1BQU0sSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDekI7SUFDSCxDQUFDO0NBQUE7QUFFRCxNQUFNLFVBQWdCLFdBQVcsQ0FDL0IsTUFBYyxFQUNkLEtBQWUsRUFDZixNQUFrQzs7UUFFbEMsSUFBSTtZQUNGLE1BQU0sc0JBQXNCLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVFLE1BQU0sWUFBWSxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FDcEMsc0JBQXNCLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQ3BDLHNCQUFzQixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FDekMsQ0FDRixDQUFDO1lBQ0YsTUFBTSxZQUFZLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FDdEMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEVBQ2hDLElBQUksQ0FDTCxDQUFDO1lBQ0YsTUFBTSxPQUFPLEdBQXdCO2dCQUNuQyxPQUFPLEVBQUUsWUFBWTthQUN0QixDQUFDO1lBQ0YsT0FBTyxPQUFPLENBQUM7U0FDaEI7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE1BQU0sSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDekI7SUFDSCxDQUFDO0NBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCdWNrZXQsIEZpbGUgfSBmcm9tICcuLi8uLi90eXBlcy9nb29nbGUtY2xvdWQtdHlwZXMnO1xuaW1wb3J0IHsgVkVycm9yIH0gZnJvbSAndmVycm9yJztcbmltcG9ydCB7IHBhdGhzIH0gZnJvbSAnLi4vLi4vdXRpbHMvcGF0aHMnO1xuaW1wb3J0IHsgQ29yZVR5cGVzIH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xuaW1wb3J0IHsgc3RvcmFnZSB9IGZyb20gJy4uLy4uL3V0aWxzL3N0b3JhZ2UtaGVscGVyJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHRyeURlbGV0ZUZpbGUoZmlsZTogRmlsZSk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICB0cnkge1xuICAgIGNvbnN0IFtleGlzdHNdID0gYXdhaXQgZmlsZS5leGlzdHMoKTtcbiAgICBpZiAoZXhpc3RzKSB7XG4gICAgICBjb25zb2xlLmxvZygnLSBkZWxldGluZyBmaWxlOiAnLCBmaWxlLm5hbWUpO1xuICAgICAgYXdhaXQgZmlsZS5kZWxldGUoKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgdGhyb3cgbmV3IFZFcnJvcihlcnJvcik7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFJlbW92ZUZpbGVXaXRoQ2hpbGRyZW4oXG4gIGJ1Y2tldDogQnVja2V0LFxuICBpdGVtUGF0aDogc3RyaW5nXG4pOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBhbGxDaGlsZHJlbiA9IGF3YWl0IHN0b3JhZ2UuR2V0QWxsQ2hpbGRyZW5XaXRoUHJlZml4KGJ1Y2tldCwgaXRlbVBhdGgpO1xuICAgIGNvbnN0IHN1Y2Nlc3NBcnJheSA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgYWxsQ2hpbGRyZW4ubWFwKGYgPT4gdHJ5RGVsZXRlRmlsZShmKSlcbiAgICApO1xuICAgIGNvbnN0IGFsbFN1Y2Nlc3NlcyA9IHN1Y2Nlc3NBcnJheS5yZWR1Y2UoXG4gICAgICAoYWNjLCBjdXIpID0+IChhY2MgPSBhY2MgJiYgY3VyKSxcbiAgICAgIHRydWVcbiAgICApO1xuICAgIHJldHVybiBhbGxTdWNjZXNzZXM7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgdGhyb3cgbmV3IFZFcnJvcihlcnJvcik7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFJlbW92ZUZpbGVzKFxuICBidWNrZXQ6IEJ1Y2tldCxcbiAgaXRlbXM6IHN0cmluZ1tdLFxuICBjbGFpbXM6IENvcmVUeXBlcy5Vc2VyQ3VzdG9tQ2xhaW1zXG4pIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBnb29nbGVTdG9yYWdlSXRlbVBhdGhzID0gaXRlbXMubWFwKHAgPT4gcGF0aHMuRW5zdXJlTm9QcmVmaXhTbGFzaChwKSk7XG4gICAgY29uc3Qgc3VjY2Vzc0FycmF5ID0gYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICBnb29nbGVTdG9yYWdlSXRlbVBhdGhzLm1hcChpdGVtUGF0aCA9PlxuICAgICAgICBSZW1vdmVGaWxlV2l0aENoaWxkcmVuKGJ1Y2tldCwgaXRlbVBhdGgpXG4gICAgICApXG4gICAgKTtcbiAgICBjb25zdCBhbGxTdWNjZXNzZXMgPSBzdWNjZXNzQXJyYXkucmVkdWNlKFxuICAgICAgKGFjYywgY3VyKSA9PiAoYWNjID0gYWNjICYmIGN1ciksXG4gICAgICB0cnVlXG4gICAgKTtcbiAgICBjb25zdCByZXN1bHRzOiBDb3JlVHlwZXMuUmVzdWx0T2JqID0ge1xuICAgICAgc3VjY2VzczogYWxsU3VjY2Vzc2VzXG4gICAgfTtcbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICB0aHJvdyBuZXcgVkVycm9yKGVycm9yKTtcbiAgfVxufVxuIl19