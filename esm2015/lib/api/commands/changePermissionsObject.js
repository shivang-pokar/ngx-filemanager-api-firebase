import { __awaiter } from "tslib";
import { VError } from 'verror';
import { perms } from '../../permissions';
import { storage } from '../../utils/storage-helper';
export function TryChangeSingleFilePermissionsObject(file, newPermissions, claims) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Disabled for new Admin Flag in config
            // const currentFilePermissions = await perms.queries.RetrieveFilePermissions(
            //   file
            // );
            // perms.queries.CheckCanEditPermissions(
            //   currentFilePermissions,
            //   newPermissions,
            //   claims
            // );
            const res = yield perms.commands.UpdateFilePermissions(file, newPermissions);
            return res;
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
function tryChangePermissionsObject(bucket, filePath, permissionsObj, isRecursive, claims) {
    return __awaiter(this, void 0, void 0, function* () {
        if (isRecursive) {
            try {
                const allChildren = yield storage.GetAllChildrenWithPrefix(bucket, filePath);
                const successArray = yield Promise.all(allChildren.map(file => TryChangeSingleFilePermissionsObject(file, permissionsObj, claims)));
                return successArray;
            }
            catch (error) {
                throw new VError(error);
            }
        }
        else {
            try {
                const file = bucket.file(filePath);
                const result = yield TryChangeSingleFilePermissionsObject(file, permissionsObj, claims);
                return [result];
            }
            catch (error) {
                throw new VError(error);
            }
        }
    });
}
export function ChangePermissionsObject(bucket, items, permissionsObj, isRecursive, claims) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const successArr = yield Promise.all(items.map(filePath => tryChangePermissionsObject(bucket, filePath, permissionsObj, isRecursive, claims)));
            return {
                success: successArr
            };
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlUGVybWlzc2lvbnNPYmplY3QuanMiLCJzb3VyY2VSb290IjoiL1ZvbHVtZXMvU2hpdmFuZy9QaSBTb2Z0d2FyZS9maWxlLW1hbmFnZXIvbmd4LWZpbGVtYW5hZ2VyL3Byb2plY3RzL25neC1maWxlbWFuYWdlci1hcGktZmlyZWJhc2Uvc3JjLyIsInNvdXJjZXMiOlsibGliL2FwaS9jb21tYW5kcy9jaGFuZ2VQZXJtaXNzaW9uc09iamVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBSUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUNoQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDMUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRXJELE1BQU0sVUFBZ0Isb0NBQW9DLENBQ3hELElBQVUsRUFDVixjQUErQyxFQUMvQyxNQUFrQzs7UUFFbEMsSUFBSTtZQUNGLHdDQUF3QztZQUN4Qyw4RUFBOEU7WUFDOUUsU0FBUztZQUNULEtBQUs7WUFDTCx5Q0FBeUM7WUFDekMsNEJBQTRCO1lBQzVCLG9CQUFvQjtZQUNwQixXQUFXO1lBQ1gsS0FBSztZQUNMLE1BQU0sR0FBRyxHQUFHLE1BQU0sS0FBSyxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FDcEQsSUFBSSxFQUNKLGNBQWMsQ0FDZixDQUFDO1lBQ0YsT0FBTyxHQUFHLENBQUM7U0FDWjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsTUFBTSxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN4QjtJQUNILENBQUM7Q0FBQTtBQUVELFNBQWUsMEJBQTBCLENBQ3ZDLE1BQWMsRUFDZCxRQUFnQixFQUNoQixjQUErQyxFQUMvQyxXQUFvQixFQUNwQixNQUFrQzs7UUFFbEMsSUFBSSxXQUFXLEVBQUU7WUFDZixJQUFJO2dCQUNGLE1BQU0sV0FBVyxHQUFHLE1BQU0sT0FBTyxDQUFDLHdCQUF3QixDQUN4RCxNQUFNLEVBQ04sUUFBUSxDQUNULENBQUM7Z0JBQ0YsTUFBTSxZQUFZLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUNwQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQ3JCLG9DQUFvQyxDQUFDLElBQUksRUFBRSxjQUFjLEVBQUUsTUFBTSxDQUFDLENBQ25FLENBQ0YsQ0FBQztnQkFDRixPQUFPLFlBQVksQ0FBQzthQUNyQjtZQUFDLE9BQU8sS0FBSyxFQUFFO2dCQUNkLE1BQU0sSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDekI7U0FDRjthQUFNO1lBQ0wsSUFBSTtnQkFDRixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNuQyxNQUFNLE1BQU0sR0FBRyxNQUFNLG9DQUFvQyxDQUN2RCxJQUFJLEVBQ0osY0FBYyxFQUNkLE1BQU0sQ0FDUCxDQUFDO2dCQUNGLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNqQjtZQUFDLE9BQU8sS0FBSyxFQUFFO2dCQUNkLE1BQU0sSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDekI7U0FDRjtJQUNILENBQUM7Q0FBQTtBQUVELE1BQU0sVUFBZ0IsdUJBQXVCLENBQzNDLE1BQWMsRUFDZCxLQUFlLEVBQ2YsY0FBK0MsRUFDL0MsV0FBb0IsRUFDcEIsTUFBa0M7O1FBRWxDLElBQUk7WUFDRixNQUFNLFVBQVUsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQ2xDLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FDbkIsMEJBQTBCLENBQ3hCLE1BQU0sRUFDTixRQUFRLEVBQ1IsY0FBYyxFQUNkLFdBQVcsRUFDWCxNQUFNLENBQ1AsQ0FDRixDQUNGLENBQUM7WUFDRixPQUFPO2dCQUNMLE9BQU8sRUFBRSxVQUFpQjthQUMzQixDQUFDO1NBQ0g7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE1BQU0sSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ2hDO0lBQ0gsQ0FBQztDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRmlsZSB9IGZyb20gJy4uLy4uL3R5cGVzL2dvb2dsZS1jbG91ZC10eXBlcyc7XG5pbXBvcnQgeyBCdWNrZXQgfSBmcm9tICdAZ29vZ2xlLWNsb3VkL3N0b3JhZ2UnO1xuaW1wb3J0ICogYXMgcmVxdWVzdCBmcm9tICdyZXF1ZXN0JztcbmltcG9ydCB7IENvcmVUeXBlcyB9IGZyb20gJy4uLy4uL3R5cGVzJztcbmltcG9ydCB7IFZFcnJvciB9IGZyb20gJ3ZlcnJvcic7XG5pbXBvcnQgeyBwZXJtcyB9IGZyb20gJy4uLy4uL3Blcm1pc3Npb25zJztcbmltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tICcuLi8uLi91dGlscy9zdG9yYWdlLWhlbHBlcic7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBUcnlDaGFuZ2VTaW5nbGVGaWxlUGVybWlzc2lvbnNPYmplY3QoXG4gIGZpbGU6IEZpbGUsXG4gIG5ld1Blcm1pc3Npb25zOiBDb3JlVHlwZXMuRmlsZVBlcm1pc3Npb25zT2JqZWN0LFxuICBjbGFpbXM6IENvcmVUeXBlcy5Vc2VyQ3VzdG9tQ2xhaW1zXG4pIHtcbiAgdHJ5IHtcbiAgICAvLyBEaXNhYmxlZCBmb3IgbmV3IEFkbWluIEZsYWcgaW4gY29uZmlnXG4gICAgLy8gY29uc3QgY3VycmVudEZpbGVQZXJtaXNzaW9ucyA9IGF3YWl0IHBlcm1zLnF1ZXJpZXMuUmV0cmlldmVGaWxlUGVybWlzc2lvbnMoXG4gICAgLy8gICBmaWxlXG4gICAgLy8gKTtcbiAgICAvLyBwZXJtcy5xdWVyaWVzLkNoZWNrQ2FuRWRpdFBlcm1pc3Npb25zKFxuICAgIC8vICAgY3VycmVudEZpbGVQZXJtaXNzaW9ucyxcbiAgICAvLyAgIG5ld1Blcm1pc3Npb25zLFxuICAgIC8vICAgY2xhaW1zXG4gICAgLy8gKTtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBwZXJtcy5jb21tYW5kcy5VcGRhdGVGaWxlUGVybWlzc2lvbnMoXG4gICAgICBmaWxlLFxuICAgICAgbmV3UGVybWlzc2lvbnNcbiAgICApO1xuICAgIHJldHVybiByZXM7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiB0cnlDaGFuZ2VQZXJtaXNzaW9uc09iamVjdChcbiAgYnVja2V0OiBCdWNrZXQsXG4gIGZpbGVQYXRoOiBzdHJpbmcsXG4gIHBlcm1pc3Npb25zT2JqOiBDb3JlVHlwZXMuRmlsZVBlcm1pc3Npb25zT2JqZWN0LFxuICBpc1JlY3Vyc2l2ZTogYm9vbGVhbixcbiAgY2xhaW1zOiBDb3JlVHlwZXMuVXNlckN1c3RvbUNsYWltc1xuKTogUHJvbWlzZTx7fVtdPiB7XG4gIGlmIChpc1JlY3Vyc2l2ZSkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBhbGxDaGlsZHJlbiA9IGF3YWl0IHN0b3JhZ2UuR2V0QWxsQ2hpbGRyZW5XaXRoUHJlZml4KFxuICAgICAgICBidWNrZXQsXG4gICAgICAgIGZpbGVQYXRoXG4gICAgICApO1xuICAgICAgY29uc3Qgc3VjY2Vzc0FycmF5ID0gYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgIGFsbENoaWxkcmVuLm1hcChmaWxlID0+XG4gICAgICAgICAgVHJ5Q2hhbmdlU2luZ2xlRmlsZVBlcm1pc3Npb25zT2JqZWN0KGZpbGUsIHBlcm1pc3Npb25zT2JqLCBjbGFpbXMpXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgICByZXR1cm4gc3VjY2Vzc0FycmF5O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aHJvdyBuZXcgVkVycm9yKGVycm9yKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGZpbGUgPSBidWNrZXQuZmlsZShmaWxlUGF0aCk7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBUcnlDaGFuZ2VTaW5nbGVGaWxlUGVybWlzc2lvbnNPYmplY3QoXG4gICAgICAgIGZpbGUsXG4gICAgICAgIHBlcm1pc3Npb25zT2JqLFxuICAgICAgICBjbGFpbXNcbiAgICAgICk7XG4gICAgICByZXR1cm4gW3Jlc3VsdF07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRocm93IG5ldyBWRXJyb3IoZXJyb3IpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gQ2hhbmdlUGVybWlzc2lvbnNPYmplY3QoXG4gIGJ1Y2tldDogQnVja2V0LFxuICBpdGVtczogc3RyaW5nW10sXG4gIHBlcm1pc3Npb25zT2JqOiBDb3JlVHlwZXMuRmlsZVBlcm1pc3Npb25zT2JqZWN0LFxuICBpc1JlY3Vyc2l2ZTogYm9vbGVhbixcbiAgY2xhaW1zOiBDb3JlVHlwZXMuVXNlckN1c3RvbUNsYWltc1xuKTogUHJvbWlzZTxDb3JlVHlwZXMuUmVzdWx0T2JqPiB7XG4gIHRyeSB7XG4gICAgY29uc3Qgc3VjY2Vzc0FyciA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgaXRlbXMubWFwKGZpbGVQYXRoID0+XG4gICAgICAgIHRyeUNoYW5nZVBlcm1pc3Npb25zT2JqZWN0KFxuICAgICAgICAgIGJ1Y2tldCxcbiAgICAgICAgICBmaWxlUGF0aCxcbiAgICAgICAgICBwZXJtaXNzaW9uc09iaixcbiAgICAgICAgICBpc1JlY3Vyc2l2ZSxcbiAgICAgICAgICBjbGFpbXNcbiAgICAgICAgKVxuICAgICAgKVxuICAgICk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN1Y2Nlc3M6IHN1Y2Nlc3NBcnIgYXMgYW55XG4gICAgfTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gIH1cbn1cbiJdfQ==