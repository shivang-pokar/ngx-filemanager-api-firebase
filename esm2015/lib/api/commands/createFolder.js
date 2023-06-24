import { __awaiter } from "tslib";
import { paths } from '../../utils/paths';
import { storage } from '../../utils/storage-helper';
import { perms } from '../../permissions';
export function CreateFolderWithoutPermissions(bucket, newDirectoryPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const directoryPath = paths.EnsureGoogleStoragePathDir(newDirectoryPath);
        const file = bucket.file(directoryPath);
        const result = { success: true };
        try {
            yield file.save('');
            const blankPerms = perms.factory.blankPermissionsObj();
            yield perms.commands.UpdateFilePermissions(file, blankPerms);
        }
        catch (error) {
            result.success = false;
        }
        return result;
    });
}
export function GetNextFreeFoldername(bucket, targetChildDir) {
    return __awaiter(this, void 0, void 0, function* () {
        const parentDirectory = paths.GetParentDir(targetChildDir.name);
        const childrenMatching = yield storage.GetListWithoutPermissions(bucket, parentDirectory);
        const isEmptyParent = !childrenMatching || !childrenMatching.length;
        if (isEmptyParent) {
            return targetChildDir;
        }
        const childrenMatchingPaths = childrenMatching.map(f => paths.EnsureGoogleStoragePathDir(f.fullPath));
        const targetFolderPath = paths.EnsureGoogleStoragePathDir(targetChildDir.name);
        const folderExists = childrenMatchingPaths.some(path => path === targetFolderPath);
        if (!folderExists) {
            return targetChildDir;
        }
        const nextPath = paths.Add2ToPathDir(targetFolderPath);
        const nextFreeFile = bucket.file(nextPath);
        return nextFreeFile;
    });
}
export function CreateFolder(bucket, newDirectoryPath, claims, disableNoClobber, isAdmin) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newDirPath = paths.EnsureGoogleStoragePathDir(newDirectoryPath);
            const newDir = bucket.file(newDirPath);
            let newDirToAdd;
            if (!disableNoClobber) {
                newDirToAdd = yield GetNextFreeFoldername(bucket, newDir);
            }
            else {
                newDirToAdd = newDir;
            }
            if (!isAdmin) {
                yield storage.TryCheckWritePermission(bucket, newDirToAdd.name, claims);
            }
            return CreateFolderWithoutPermissions(bucket, newDirToAdd.name);
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlRm9sZGVyLmpzIiwic291cmNlUm9vdCI6Ii9Wb2x1bWVzL1NoaXZhbmcvUGkgU29mdHdhcmUvZmlsZS1tYW5hZ2VyL25neC1maWxlbWFuYWdlci9wcm9qZWN0cy9uZ3gtZmlsZW1hbmFnZXItYXBpLWZpcmViYXNlL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9hcGkvY29tbWFuZHMvY3JlYXRlRm9sZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDMUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUUxQyxNQUFNLFVBQWdCLDhCQUE4QixDQUNsRCxNQUFjLEVBQ2QsZ0JBQXdCOztRQUV4QixNQUFNLGFBQWEsR0FBRyxLQUFLLENBQUMsMEJBQTBCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN6RSxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sTUFBTSxHQUFHLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO1FBQ2pDLElBQUk7WUFDRixNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEIsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBQ3ZELE1BQU0sS0FBSyxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FDOUQ7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE1BQU0sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1NBQ3hCO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztDQUFBO0FBRUQsTUFBTSxVQUFnQixxQkFBcUIsQ0FDekMsTUFBYyxFQUNkLGNBQW9COztRQUVwQixNQUFNLGVBQWUsR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoRSxNQUFNLGdCQUFnQixHQUFHLE1BQU0sT0FBTyxDQUFDLHlCQUF5QixDQUM5RCxNQUFNLEVBQ04sZUFBZSxDQUNoQixDQUFDO1FBQ0YsTUFBTSxhQUFhLEdBQUcsQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQztRQUNwRSxJQUFJLGFBQWEsRUFBRTtZQUNqQixPQUFPLGNBQWMsQ0FBQztTQUN2QjtRQUNELE1BQU0scUJBQXFCLEdBQUcsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQ3JELEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQzdDLENBQUM7UUFDRixNQUFNLGdCQUFnQixHQUFHLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0UsTUFBTSxZQUFZLEdBQUcscUJBQXFCLENBQUMsSUFBSSxDQUM3QyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSyxnQkFBZ0IsQ0FDbEMsQ0FBQztRQUNGLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDakIsT0FBTyxjQUFjLENBQUM7U0FDdkI7UUFDRCxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDdkQsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzQyxPQUFPLFlBQVksQ0FBQztJQUN0QixDQUFDO0NBQUE7QUFFRCxNQUFNLFVBQWdCLFlBQVksQ0FDaEMsTUFBYyxFQUNkLGdCQUF3QixFQUN4QixNQUFrQyxFQUNsQyxnQkFBMEIsRUFDMUIsT0FBaUI7O1FBRWpCLElBQUk7WUFDRixNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsMEJBQTBCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUN0RSxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksV0FBaUIsQ0FBQztZQUN0QixJQUFJLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQ3JCLFdBQVcsR0FBRyxNQUFNLHFCQUFxQixDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQzthQUMzRDtpQkFBTTtnQkFDTCxXQUFXLEdBQUcsTUFBTSxDQUFDO2FBQ3RCO1lBQ0QsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDWixNQUFNLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQzthQUN6RTtZQUNELE9BQU8sOEJBQThCLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNqRTtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsTUFBTSxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN4QjtJQUNILENBQUM7Q0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJ1Y2tldCwgRmlsZSB9IGZyb20gJy4uLy4uL3R5cGVzL2dvb2dsZS1jbG91ZC10eXBlcyc7XG5pbXBvcnQgeyBDb3JlVHlwZXMgfSBmcm9tICcuLi8uLi90eXBlcyc7XG5pbXBvcnQgeyBwYXRocyB9IGZyb20gJy4uLy4uL3V0aWxzL3BhdGhzJztcbmltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tICcuLi8uLi91dGlscy9zdG9yYWdlLWhlbHBlcic7XG5pbXBvcnQgeyBwZXJtcyB9IGZyb20gJy4uLy4uL3Blcm1pc3Npb25zJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIENyZWF0ZUZvbGRlcldpdGhvdXRQZXJtaXNzaW9ucyhcbiAgYnVja2V0OiBCdWNrZXQsXG4gIG5ld0RpcmVjdG9yeVBhdGg6IHN0cmluZ1xuKSB7XG4gIGNvbnN0IGRpcmVjdG9yeVBhdGggPSBwYXRocy5FbnN1cmVHb29nbGVTdG9yYWdlUGF0aERpcihuZXdEaXJlY3RvcnlQYXRoKTtcbiAgY29uc3QgZmlsZSA9IGJ1Y2tldC5maWxlKGRpcmVjdG9yeVBhdGgpO1xuICBjb25zdCByZXN1bHQgPSB7IHN1Y2Nlc3M6IHRydWUgfTtcbiAgdHJ5IHtcbiAgICBhd2FpdCBmaWxlLnNhdmUoJycpO1xuICAgIGNvbnN0IGJsYW5rUGVybXMgPSBwZXJtcy5mYWN0b3J5LmJsYW5rUGVybWlzc2lvbnNPYmooKTtcbiAgICBhd2FpdCBwZXJtcy5jb21tYW5kcy5VcGRhdGVGaWxlUGVybWlzc2lvbnMoZmlsZSwgYmxhbmtQZXJtcyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVzdWx0LnN1Y2Nlc3MgPSBmYWxzZTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR2V0TmV4dEZyZWVGb2xkZXJuYW1lKFxuICBidWNrZXQ6IEJ1Y2tldCxcbiAgdGFyZ2V0Q2hpbGREaXI6IEZpbGVcbik6IFByb21pc2U8RmlsZT4ge1xuICBjb25zdCBwYXJlbnREaXJlY3RvcnkgPSBwYXRocy5HZXRQYXJlbnREaXIodGFyZ2V0Q2hpbGREaXIubmFtZSk7XG4gIGNvbnN0IGNoaWxkcmVuTWF0Y2hpbmcgPSBhd2FpdCBzdG9yYWdlLkdldExpc3RXaXRob3V0UGVybWlzc2lvbnMoXG4gICAgYnVja2V0LFxuICAgIHBhcmVudERpcmVjdG9yeVxuICApO1xuICBjb25zdCBpc0VtcHR5UGFyZW50ID0gIWNoaWxkcmVuTWF0Y2hpbmcgfHwgIWNoaWxkcmVuTWF0Y2hpbmcubGVuZ3RoO1xuICBpZiAoaXNFbXB0eVBhcmVudCkge1xuICAgIHJldHVybiB0YXJnZXRDaGlsZERpcjtcbiAgfVxuICBjb25zdCBjaGlsZHJlbk1hdGNoaW5nUGF0aHMgPSBjaGlsZHJlbk1hdGNoaW5nLm1hcChmID0+XG4gICAgcGF0aHMuRW5zdXJlR29vZ2xlU3RvcmFnZVBhdGhEaXIoZi5mdWxsUGF0aClcbiAgKTtcbiAgY29uc3QgdGFyZ2V0Rm9sZGVyUGF0aCA9IHBhdGhzLkVuc3VyZUdvb2dsZVN0b3JhZ2VQYXRoRGlyKHRhcmdldENoaWxkRGlyLm5hbWUpO1xuICBjb25zdCBmb2xkZXJFeGlzdHMgPSBjaGlsZHJlbk1hdGNoaW5nUGF0aHMuc29tZShcbiAgICBwYXRoID0+IHBhdGggPT09IHRhcmdldEZvbGRlclBhdGhcbiAgKTtcbiAgaWYgKCFmb2xkZXJFeGlzdHMpIHtcbiAgICByZXR1cm4gdGFyZ2V0Q2hpbGREaXI7XG4gIH1cbiAgY29uc3QgbmV4dFBhdGggPSBwYXRocy5BZGQyVG9QYXRoRGlyKHRhcmdldEZvbGRlclBhdGgpO1xuICBjb25zdCBuZXh0RnJlZUZpbGUgPSBidWNrZXQuZmlsZShuZXh0UGF0aCk7XG4gIHJldHVybiBuZXh0RnJlZUZpbGU7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBDcmVhdGVGb2xkZXIoXG4gIGJ1Y2tldDogQnVja2V0LFxuICBuZXdEaXJlY3RvcnlQYXRoOiBzdHJpbmcsXG4gIGNsYWltczogQ29yZVR5cGVzLlVzZXJDdXN0b21DbGFpbXMsXG4gIGRpc2FibGVOb0Nsb2JiZXI/OiBib29sZWFuLFxuICBpc0FkbWluPzogYm9vbGVhbixcbikge1xuICB0cnkge1xuICAgIGNvbnN0IG5ld0RpclBhdGggPSBwYXRocy5FbnN1cmVHb29nbGVTdG9yYWdlUGF0aERpcihuZXdEaXJlY3RvcnlQYXRoKTtcbiAgICBjb25zdCBuZXdEaXIgPSBidWNrZXQuZmlsZShuZXdEaXJQYXRoKTtcbiAgICBsZXQgbmV3RGlyVG9BZGQ6IEZpbGU7XG4gICAgaWYgKCFkaXNhYmxlTm9DbG9iYmVyKSB7XG4gICAgICBuZXdEaXJUb0FkZCA9IGF3YWl0IEdldE5leHRGcmVlRm9sZGVybmFtZShidWNrZXQsIG5ld0Rpcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld0RpclRvQWRkID0gbmV3RGlyO1xuICAgIH1cbiAgICBpZiAoIWlzQWRtaW4pIHtcbiAgICAgIGF3YWl0IHN0b3JhZ2UuVHJ5Q2hlY2tXcml0ZVBlcm1pc3Npb24oYnVja2V0LCBuZXdEaXJUb0FkZC5uYW1lLCBjbGFpbXMpO1xuICAgIH1cbiAgICByZXR1cm4gQ3JlYXRlRm9sZGVyV2l0aG91dFBlcm1pc3Npb25zKGJ1Y2tldCwgbmV3RGlyVG9BZGQubmFtZSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcbiAgfVxufVxuIl19