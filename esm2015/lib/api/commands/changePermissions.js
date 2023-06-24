import { __awaiter } from "tslib";
import { VError } from 'verror';
import { perms } from '../../permissions';
import { storage } from '../../utils/storage-helper';
export function SetPermissionToObj(permissionsObj, role, entity) {
    const newPermissions = Object.assign(Object.assign({}, perms.factory.blankPermissionsObj()), permissionsObj);
    if (role === 'READER') {
        if (!newPermissions.readers.includes(entity)) {
            newPermissions.readers.push(entity);
        }
    }
    if (role === 'WRITER') {
        if (!newPermissions.writers.includes(entity)) {
            newPermissions.writers.push(entity);
        }
    }
    return newPermissions;
}
export function ChangeSingleFilePermissionsAsSudo(file, role, entity) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const currentFilePermissions = yield perms.queries.RetrieveFilePermissions(file);
            const newPermissions = SetPermissionToObj(currentFilePermissions, role, entity);
            const res = yield perms.commands.UpdateFilePermissions(file, newPermissions);
            return res;
        }
        catch (error) {
            throw new VError(error);
        }
    });
}
export function TryChangeSingleFilePermissions(file, role, entity, claims) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const currentFilePermissions = yield perms.queries.RetrieveFilePermissions(file);
            const newPermissions = SetPermissionToObj(currentFilePermissions, role, entity);
            perms.queries.CheckCanEditPermissions(currentFilePermissions, newPermissions, claims);
            const res = yield perms.commands.UpdateFilePermissions(file, newPermissions);
            return res;
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
function tryChangePermissions(bucket, filePath, role, entity, isRecursive, claims) {
    return __awaiter(this, void 0, void 0, function* () {
        if (isRecursive) {
            try {
                const allChildren = yield storage.GetAllChildrenWithPrefix(bucket, filePath);
                const successArray = yield Promise.all(allChildren.map(file => TryChangeSingleFilePermissions(file, role, entity, claims)));
                return successArray;
            }
            catch (error) {
                throw new VError(error);
            }
        }
        else {
            try {
                const file = bucket.file(filePath);
                const result = yield TryChangeSingleFilePermissions(file, role, entity, claims);
                return [result];
            }
            catch (error) {
                throw new VError(error);
            }
        }
    });
}
export function ChangePermissions(bucket, items, role, entity, isRecursive, claims) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // perms.queries.TryCheckHasAnyPermissions(claims);
            const successArr = yield Promise.all(items.map(filePath => tryChangePermissions(bucket, filePath, role, entity, isRecursive, claims)));
            // return results;
            return {
                success: successArr
            };
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlUGVybWlzc2lvbnMuanMiLCJzb3VyY2VSb290IjoiL1ZvbHVtZXMvU2hpdmFuZy9QaSBTb2Z0d2FyZS9maWxlLW1hbmFnZXIvbmd4LWZpbGVtYW5hZ2VyL3Byb2plY3RzL25neC1maWxlbWFuYWdlci1hcGktZmlyZWJhc2Uvc3JjLyIsInNvdXJjZXMiOlsibGliL2FwaS9jb21tYW5kcy9jaGFuZ2VQZXJtaXNzaW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBSUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUNoQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDMUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRXJELE1BQU0sVUFBVSxrQkFBa0IsQ0FDaEMsY0FBK0MsRUFDL0MsSUFBK0IsRUFDL0IsTUFBc0M7SUFFdEMsTUFBTSxjQUFjLG1DQUNmLEtBQUssQ0FBQyxPQUFPLENBQUMsbUJBQW1CLEVBQUUsR0FDbkMsY0FBYyxDQUNsQixDQUFDO0lBQ0YsSUFBSSxJQUFJLEtBQUssUUFBUSxFQUFFO1FBQ3JCLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUM1QyxjQUFjLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNyQztLQUNGO0lBQ0QsSUFBSSxJQUFJLEtBQUssUUFBUSxFQUFFO1FBQ3JCLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUM1QyxjQUFjLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNyQztLQUNGO0lBQ0QsT0FBTyxjQUFjLENBQUM7QUFDeEIsQ0FBQztBQUVELE1BQU0sVUFBZ0IsaUNBQWlDLENBQ3JELElBQVUsRUFDVixJQUErQixFQUMvQixNQUFzQzs7UUFFdEMsSUFBSTtZQUNGLE1BQU0sc0JBQXNCLEdBQUcsTUFBTSxLQUFLLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUN4RSxJQUFJLENBQ0wsQ0FBQztZQUNGLE1BQU0sY0FBYyxHQUFHLGtCQUFrQixDQUN2QyxzQkFBc0IsRUFDdEIsSUFBSSxFQUNKLE1BQU0sQ0FDUCxDQUFDO1lBQ0YsTUFBTSxHQUFHLEdBQUcsTUFBTSxLQUFLLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUNwRCxJQUFJLEVBQ0osY0FBYyxDQUNmLENBQUM7WUFDRixPQUFPLEdBQUcsQ0FBQztTQUNaO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxNQUFNLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQztDQUFBO0FBRUQsTUFBTSxVQUFnQiw4QkFBOEIsQ0FDbEQsSUFBVSxFQUNWLElBQStCLEVBQy9CLE1BQXNDLEVBQ3RDLE1BQWtDOztRQUVsQyxJQUFJO1lBQ0YsTUFBTSxzQkFBc0IsR0FBRyxNQUFNLEtBQUssQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQ3hFLElBQUksQ0FDTCxDQUFDO1lBQ0YsTUFBTSxjQUFjLEdBQUcsa0JBQWtCLENBQ3ZDLHNCQUFzQixFQUN0QixJQUFJLEVBQ0osTUFBTSxDQUNQLENBQUM7WUFDRixLQUFLLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUNuQyxzQkFBc0IsRUFDdEIsY0FBYyxFQUNkLE1BQU0sQ0FDUCxDQUFDO1lBQ0YsTUFBTSxHQUFHLEdBQUcsTUFBTSxLQUFLLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUNwRCxJQUFJLEVBQ0osY0FBYyxDQUNmLENBQUM7WUFDRixPQUFPLEdBQUcsQ0FBQztTQUNaO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxNQUFNLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQztDQUFBO0FBRUQsU0FBZSxvQkFBb0IsQ0FDakMsTUFBYyxFQUNkLFFBQWdCLEVBQ2hCLElBQStCLEVBQy9CLE1BQXNDLEVBQ3RDLFdBQW9CLEVBQ3BCLE1BQWtDOztRQUVsQyxJQUFJLFdBQVcsRUFBRTtZQUNmLElBQUk7Z0JBQ0YsTUFBTSxXQUFXLEdBQUcsTUFBTSxPQUFPLENBQUMsd0JBQXdCLENBQ3hELE1BQU0sRUFDTixRQUFRLENBQ1QsQ0FBQztnQkFDRixNQUFNLFlBQVksR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQ3BDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FDckIsOEJBQThCLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQzNELENBQ0YsQ0FBQztnQkFDRixPQUFPLFlBQVksQ0FBQzthQUNyQjtZQUFDLE9BQU8sS0FBSyxFQUFFO2dCQUNkLE1BQU0sSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDekI7U0FDRjthQUFNO1lBQ0wsSUFBSTtnQkFDRixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNuQyxNQUFNLE1BQU0sR0FBRyxNQUFNLDhCQUE4QixDQUNqRCxJQUFJLEVBQ0osSUFBSSxFQUNKLE1BQU0sRUFDTixNQUFNLENBQ1AsQ0FBQztnQkFDRixPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDakI7WUFBQyxPQUFPLEtBQUssRUFBRTtnQkFDZCxNQUFNLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3pCO1NBQ0Y7SUFDSCxDQUFDO0NBQUE7QUFFRCxNQUFNLFVBQWdCLGlCQUFpQixDQUNyQyxNQUFjLEVBQ2QsS0FBZSxFQUNmLElBQStCLEVBQy9CLE1BQXNDLEVBQ3RDLFdBQW9CLEVBQ3BCLE1BQWtDOztRQUVsQyxJQUFJO1lBQ0YsbURBQW1EO1lBQ25ELE1BQU0sVUFBVSxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FDbEMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUNuQixvQkFBb0IsQ0FDbEIsTUFBTSxFQUNOLFFBQVEsRUFDUixJQUFJLEVBQ0osTUFBTSxFQUNOLFdBQVcsRUFDWCxNQUFNLENBQ1AsQ0FDRixDQUNGLENBQUM7WUFDRixrQkFBa0I7WUFDbEIsT0FBTztnQkFDTCxPQUFPLEVBQUUsVUFBaUI7YUFDM0IsQ0FBQztTQUNIO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxNQUFNLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNoQztJQUNILENBQUM7Q0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZpbGUgfSBmcm9tICcuLi8uLi90eXBlcy9nb29nbGUtY2xvdWQtdHlwZXMnO1xuaW1wb3J0IHsgQnVja2V0IH0gZnJvbSAnQGdvb2dsZS1jbG91ZC9zdG9yYWdlJztcbmltcG9ydCAqIGFzIHJlcXVlc3QgZnJvbSAncmVxdWVzdCc7XG5pbXBvcnQgeyBDb3JlVHlwZXMgfSBmcm9tICcuLi8uLi90eXBlcyc7XG5pbXBvcnQgeyBWRXJyb3IgfSBmcm9tICd2ZXJyb3InO1xuaW1wb3J0IHsgcGVybXMgfSBmcm9tICcuLi8uLi9wZXJtaXNzaW9ucyc7XG5pbXBvcnQgeyBzdG9yYWdlIH0gZnJvbSAnLi4vLi4vdXRpbHMvc3RvcmFnZS1oZWxwZXInO1xuXG5leHBvcnQgZnVuY3Rpb24gU2V0UGVybWlzc2lvblRvT2JqKFxuICBwZXJtaXNzaW9uc09iajogQ29yZVR5cGVzLkZpbGVQZXJtaXNzaW9uc09iamVjdCxcbiAgcm9sZTogQ29yZVR5cGVzLlBlcm1pc3Npb25zUm9sZSxcbiAgZW50aXR5OiBDb3JlVHlwZXMuRmlsZVBlcm1pc3Npb25FbnRpdHlcbik6IENvcmVUeXBlcy5GaWxlUGVybWlzc2lvbnNPYmplY3Qge1xuICBjb25zdCBuZXdQZXJtaXNzaW9ucyA9IHtcbiAgICAuLi5wZXJtcy5mYWN0b3J5LmJsYW5rUGVybWlzc2lvbnNPYmooKSxcbiAgICAuLi5wZXJtaXNzaW9uc09ialxuICB9O1xuICBpZiAocm9sZSA9PT0gJ1JFQURFUicpIHtcbiAgICBpZiAoIW5ld1Blcm1pc3Npb25zLnJlYWRlcnMuaW5jbHVkZXMoZW50aXR5KSkge1xuICAgICAgbmV3UGVybWlzc2lvbnMucmVhZGVycy5wdXNoKGVudGl0eSk7XG4gICAgfVxuICB9XG4gIGlmIChyb2xlID09PSAnV1JJVEVSJykge1xuICAgIGlmICghbmV3UGVybWlzc2lvbnMud3JpdGVycy5pbmNsdWRlcyhlbnRpdHkpKSB7XG4gICAgICBuZXdQZXJtaXNzaW9ucy53cml0ZXJzLnB1c2goZW50aXR5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5ld1Blcm1pc3Npb25zO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gQ2hhbmdlU2luZ2xlRmlsZVBlcm1pc3Npb25zQXNTdWRvKFxuICBmaWxlOiBGaWxlLFxuICByb2xlOiBDb3JlVHlwZXMuUGVybWlzc2lvbnNSb2xlLFxuICBlbnRpdHk6IENvcmVUeXBlcy5GaWxlUGVybWlzc2lvbkVudGl0eVxuKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgY3VycmVudEZpbGVQZXJtaXNzaW9ucyA9IGF3YWl0IHBlcm1zLnF1ZXJpZXMuUmV0cmlldmVGaWxlUGVybWlzc2lvbnMoXG4gICAgICBmaWxlXG4gICAgKTtcbiAgICBjb25zdCBuZXdQZXJtaXNzaW9ucyA9IFNldFBlcm1pc3Npb25Ub09iaihcbiAgICAgIGN1cnJlbnRGaWxlUGVybWlzc2lvbnMsXG4gICAgICByb2xlLFxuICAgICAgZW50aXR5XG4gICAgKTtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBwZXJtcy5jb21tYW5kcy5VcGRhdGVGaWxlUGVybWlzc2lvbnMoXG4gICAgICBmaWxlLFxuICAgICAgbmV3UGVybWlzc2lvbnNcbiAgICApO1xuICAgIHJldHVybiByZXM7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgdGhyb3cgbmV3IFZFcnJvcihlcnJvcik7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFRyeUNoYW5nZVNpbmdsZUZpbGVQZXJtaXNzaW9ucyhcbiAgZmlsZTogRmlsZSxcbiAgcm9sZTogQ29yZVR5cGVzLlBlcm1pc3Npb25zUm9sZSxcbiAgZW50aXR5OiBDb3JlVHlwZXMuRmlsZVBlcm1pc3Npb25FbnRpdHksXG4gIGNsYWltczogQ29yZVR5cGVzLlVzZXJDdXN0b21DbGFpbXNcbikge1xuICB0cnkge1xuICAgIGNvbnN0IGN1cnJlbnRGaWxlUGVybWlzc2lvbnMgPSBhd2FpdCBwZXJtcy5xdWVyaWVzLlJldHJpZXZlRmlsZVBlcm1pc3Npb25zKFxuICAgICAgZmlsZVxuICAgICk7XG4gICAgY29uc3QgbmV3UGVybWlzc2lvbnMgPSBTZXRQZXJtaXNzaW9uVG9PYmooXG4gICAgICBjdXJyZW50RmlsZVBlcm1pc3Npb25zLFxuICAgICAgcm9sZSxcbiAgICAgIGVudGl0eVxuICAgICk7XG4gICAgcGVybXMucXVlcmllcy5DaGVja0NhbkVkaXRQZXJtaXNzaW9ucyhcbiAgICAgIGN1cnJlbnRGaWxlUGVybWlzc2lvbnMsXG4gICAgICBuZXdQZXJtaXNzaW9ucyxcbiAgICAgIGNsYWltc1xuICAgICk7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgcGVybXMuY29tbWFuZHMuVXBkYXRlRmlsZVBlcm1pc3Npb25zKFxuICAgICAgZmlsZSxcbiAgICAgIG5ld1Blcm1pc3Npb25zXG4gICAgKTtcbiAgICByZXR1cm4gcmVzO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gdHJ5Q2hhbmdlUGVybWlzc2lvbnMoXG4gIGJ1Y2tldDogQnVja2V0LFxuICBmaWxlUGF0aDogc3RyaW5nLFxuICByb2xlOiBDb3JlVHlwZXMuUGVybWlzc2lvbnNSb2xlLFxuICBlbnRpdHk6IENvcmVUeXBlcy5GaWxlUGVybWlzc2lvbkVudGl0eSxcbiAgaXNSZWN1cnNpdmU6IGJvb2xlYW4sXG4gIGNsYWltczogQ29yZVR5cGVzLlVzZXJDdXN0b21DbGFpbXNcbik6IFByb21pc2U8e31bXT4ge1xuICBpZiAoaXNSZWN1cnNpdmUpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgYWxsQ2hpbGRyZW4gPSBhd2FpdCBzdG9yYWdlLkdldEFsbENoaWxkcmVuV2l0aFByZWZpeChcbiAgICAgICAgYnVja2V0LFxuICAgICAgICBmaWxlUGF0aFxuICAgICAgKTtcbiAgICAgIGNvbnN0IHN1Y2Nlc3NBcnJheSA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICBhbGxDaGlsZHJlbi5tYXAoZmlsZSA9PlxuICAgICAgICAgIFRyeUNoYW5nZVNpbmdsZUZpbGVQZXJtaXNzaW9ucyhmaWxlLCByb2xlLCBlbnRpdHksIGNsYWltcylcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICAgIHJldHVybiBzdWNjZXNzQXJyYXk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRocm93IG5ldyBWRXJyb3IoZXJyb3IpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgZmlsZSA9IGJ1Y2tldC5maWxlKGZpbGVQYXRoKTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IFRyeUNoYW5nZVNpbmdsZUZpbGVQZXJtaXNzaW9ucyhcbiAgICAgICAgZmlsZSxcbiAgICAgICAgcm9sZSxcbiAgICAgICAgZW50aXR5LFxuICAgICAgICBjbGFpbXNcbiAgICAgICk7XG4gICAgICByZXR1cm4gW3Jlc3VsdF07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRocm93IG5ldyBWRXJyb3IoZXJyb3IpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gQ2hhbmdlUGVybWlzc2lvbnMoXG4gIGJ1Y2tldDogQnVja2V0LFxuICBpdGVtczogc3RyaW5nW10sXG4gIHJvbGU6IENvcmVUeXBlcy5QZXJtaXNzaW9uc1JvbGUsXG4gIGVudGl0eTogQ29yZVR5cGVzLkZpbGVQZXJtaXNzaW9uRW50aXR5LFxuICBpc1JlY3Vyc2l2ZTogYm9vbGVhbixcbiAgY2xhaW1zOiBDb3JlVHlwZXMuVXNlckN1c3RvbUNsYWltc1xuKTogUHJvbWlzZTxDb3JlVHlwZXMuUmVzdWx0T2JqPiB7XG4gIHRyeSB7XG4gICAgLy8gcGVybXMucXVlcmllcy5UcnlDaGVja0hhc0FueVBlcm1pc3Npb25zKGNsYWltcyk7XG4gICAgY29uc3Qgc3VjY2Vzc0FyciA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgaXRlbXMubWFwKGZpbGVQYXRoID0+XG4gICAgICAgIHRyeUNoYW5nZVBlcm1pc3Npb25zKFxuICAgICAgICAgIGJ1Y2tldCxcbiAgICAgICAgICBmaWxlUGF0aCxcbiAgICAgICAgICByb2xlLFxuICAgICAgICAgIGVudGl0eSxcbiAgICAgICAgICBpc1JlY3Vyc2l2ZSxcbiAgICAgICAgICBjbGFpbXNcbiAgICAgICAgKVxuICAgICAgKVxuICAgICk7XG4gICAgLy8gcmV0dXJuIHJlc3VsdHM7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN1Y2Nlc3M6IHN1Y2Nlc3NBcnIgYXMgYW55XG4gICAgfTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gIH1cbn1cbiJdfQ==