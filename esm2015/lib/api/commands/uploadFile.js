import { __awaiter } from "tslib";
import * as path from 'path';
import { paths } from '../../utils/paths';
import { storage } from '../../utils/storage-helper';
export function SaveBufferToPath(file, mimetype, buffer) {
    return __awaiter(this, void 0, void 0, function* () {
        const fileOptions = {
            contentType: mimetype
        };
        console.log('uploadFile: SaveBufferToPath', { mimetype, path: file.name });
        return file.save(buffer, fileOptions);
    });
}
export function GetNextFreeFilename(bucket, inputFile) {
    return __awaiter(this, void 0, void 0, function* () {
        const dirNameNoSuffix = paths.GetParentDir(inputFile.name);
        const childrenMatching = yield storage.GetListWithoutPermissions(bucket, dirNameNoSuffix);
        if (!childrenMatching || !childrenMatching.length) {
            return inputFile;
        }
        const matchingNames = childrenMatching.map(f => f.fullPath).sort();
        const lastMatch = matchingNames.shift();
        const nextPath = paths.Add2ToPath(lastMatch);
        const nextFreeFile = bucket.file(nextPath);
        return nextFreeFile;
    });
}
export function UploadFile(bucket, directoryPath, originalname, mimetype, buffer, claims) {
    return __awaiter(this, void 0, void 0, function* () {
        const newPath = path.join(directoryPath, originalname);
        const bucketFilePath = paths.EnsureGoogleStoragePathFile(newPath);
        const desiredFile = bucket.file(bucketFilePath);
        try {
            let file;
            const [exists] = yield desiredFile.exists();
            if (exists) {
                file = yield GetNextFreeFilename(bucket, desiredFile);
            }
            else {
                file = desiredFile;
            }
            yield SaveBufferToPath(file, mimetype, buffer);
        }
        catch (error) {
            throw new Error('UploadFile: ' + error);
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkRmlsZS5qcyIsInNvdXJjZVJvb3QiOiIvVm9sdW1lcy9TaGl2YW5nL1BpIFNvZnR3YXJlL2ZpbGUtbWFuYWdlci9uZ3gtZmlsZW1hbmFnZXIvcHJvamVjdHMvbmd4LWZpbGVtYW5hZ2VyLWFwaS1maXJlYmFzZS9zcmMvIiwic291cmNlcyI6WyJsaWIvYXBpL2NvbW1hbmRzL3VwbG9hZEZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sS0FBSyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBRTdCLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMxQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFckQsTUFBTSxVQUFnQixnQkFBZ0IsQ0FDcEMsSUFBVSxFQUNWLFFBQWdCLEVBQ2hCLE1BQWM7O1FBRWQsTUFBTSxXQUFXLEdBQUc7WUFDbEIsV0FBVyxFQUFFLFFBQVE7U0FDdEIsQ0FBQztRQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzNFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDeEMsQ0FBQztDQUFBO0FBRUQsTUFBTSxVQUFnQixtQkFBbUIsQ0FDdkMsTUFBYyxFQUNkLFNBQWU7O1FBRWYsTUFBTSxlQUFlLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0QsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLE9BQU8sQ0FBQyx5QkFBeUIsQ0FDOUQsTUFBTSxFQUNOLGVBQWUsQ0FDaEIsQ0FBQztRQUNGLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRTtZQUNqRCxPQUFPLFNBQVMsQ0FBQztTQUNsQjtRQUNELE1BQU0sYUFBYSxHQUFHLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNuRSxNQUFNLFNBQVMsR0FBRyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDeEMsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM3QyxNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLE9BQU8sWUFBWSxDQUFDO0lBQ3RCLENBQUM7Q0FBQTtBQUVELE1BQU0sVUFBZ0IsVUFBVSxDQUM5QixNQUFjLEVBQ2QsYUFBcUIsRUFDckIsWUFBb0IsRUFDcEIsUUFBZ0IsRUFDaEIsTUFBYyxFQUNkLE1BQWtDOztRQUVsQyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUN2RCxNQUFNLGNBQWMsR0FBRyxLQUFLLENBQUMsMkJBQTJCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbEUsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNoRCxJQUFJO1lBQ0YsSUFBSSxJQUFVLENBQUM7WUFDZixNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsTUFBTSxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDNUMsSUFBSSxNQUFNLEVBQUU7Z0JBQ1YsSUFBSSxHQUFHLE1BQU0sbUJBQW1CLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO2FBQ3ZEO2lCQUFNO2dCQUNMLElBQUksR0FBRyxXQUFXLENBQUM7YUFDcEI7WUFDRCxNQUFNLGdCQUFnQixDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDaEQ7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE1BQU0sSUFBSSxLQUFLLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQyxDQUFDO1NBQ3pDO0lBQ0gsQ0FBQztDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQnVja2V0LCBGaWxlIH0gZnJvbSAnLi4vLi4vdHlwZXMvZ29vZ2xlLWNsb3VkLXR5cGVzJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBDb3JlVHlwZXMgfSBmcm9tICcuLi8uLi90eXBlcyc7XG5pbXBvcnQgeyBwYXRocyB9IGZyb20gJy4uLy4uL3V0aWxzL3BhdGhzJztcbmltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tICcuLi8uLi91dGlscy9zdG9yYWdlLWhlbHBlcic7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBTYXZlQnVmZmVyVG9QYXRoKFxuICBmaWxlOiBGaWxlLFxuICBtaW1ldHlwZTogc3RyaW5nLFxuICBidWZmZXI6IEJ1ZmZlclxuKSB7XG4gIGNvbnN0IGZpbGVPcHRpb25zID0ge1xuICAgIGNvbnRlbnRUeXBlOiBtaW1ldHlwZVxuICB9O1xuICBjb25zb2xlLmxvZygndXBsb2FkRmlsZTogU2F2ZUJ1ZmZlclRvUGF0aCcsIHsgbWltZXR5cGUsIHBhdGg6IGZpbGUubmFtZSB9KTtcbiAgcmV0dXJuIGZpbGUuc2F2ZShidWZmZXIsIGZpbGVPcHRpb25zKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdldE5leHRGcmVlRmlsZW5hbWUoXG4gIGJ1Y2tldDogQnVja2V0LFxuICBpbnB1dEZpbGU6IEZpbGVcbik6IFByb21pc2U8RmlsZT4ge1xuICBjb25zdCBkaXJOYW1lTm9TdWZmaXggPSBwYXRocy5HZXRQYXJlbnREaXIoaW5wdXRGaWxlLm5hbWUpO1xuICBjb25zdCBjaGlsZHJlbk1hdGNoaW5nID0gYXdhaXQgc3RvcmFnZS5HZXRMaXN0V2l0aG91dFBlcm1pc3Npb25zKFxuICAgIGJ1Y2tldCxcbiAgICBkaXJOYW1lTm9TdWZmaXhcbiAgKTtcbiAgaWYgKCFjaGlsZHJlbk1hdGNoaW5nIHx8ICFjaGlsZHJlbk1hdGNoaW5nLmxlbmd0aCkge1xuICAgIHJldHVybiBpbnB1dEZpbGU7XG4gIH1cbiAgY29uc3QgbWF0Y2hpbmdOYW1lcyA9IGNoaWxkcmVuTWF0Y2hpbmcubWFwKGYgPT4gZi5mdWxsUGF0aCkuc29ydCgpO1xuICBjb25zdCBsYXN0TWF0Y2ggPSBtYXRjaGluZ05hbWVzLnNoaWZ0KCk7XG4gIGNvbnN0IG5leHRQYXRoID0gcGF0aHMuQWRkMlRvUGF0aChsYXN0TWF0Y2gpO1xuICBjb25zdCBuZXh0RnJlZUZpbGUgPSBidWNrZXQuZmlsZShuZXh0UGF0aCk7XG4gIHJldHVybiBuZXh0RnJlZUZpbGU7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBVcGxvYWRGaWxlKFxuICBidWNrZXQ6IEJ1Y2tldCxcbiAgZGlyZWN0b3J5UGF0aDogc3RyaW5nLFxuICBvcmlnaW5hbG5hbWU6IHN0cmluZyxcbiAgbWltZXR5cGU6IHN0cmluZyxcbiAgYnVmZmVyOiBCdWZmZXIsXG4gIGNsYWltczogQ29yZVR5cGVzLlVzZXJDdXN0b21DbGFpbXNcbikge1xuICBjb25zdCBuZXdQYXRoID0gcGF0aC5qb2luKGRpcmVjdG9yeVBhdGgsIG9yaWdpbmFsbmFtZSk7XG4gIGNvbnN0IGJ1Y2tldEZpbGVQYXRoID0gcGF0aHMuRW5zdXJlR29vZ2xlU3RvcmFnZVBhdGhGaWxlKG5ld1BhdGgpO1xuICBjb25zdCBkZXNpcmVkRmlsZSA9IGJ1Y2tldC5maWxlKGJ1Y2tldEZpbGVQYXRoKTtcbiAgdHJ5IHtcbiAgICBsZXQgZmlsZTogRmlsZTtcbiAgICBjb25zdCBbZXhpc3RzXSA9IGF3YWl0IGRlc2lyZWRGaWxlLmV4aXN0cygpO1xuICAgIGlmIChleGlzdHMpIHtcbiAgICAgIGZpbGUgPSBhd2FpdCBHZXROZXh0RnJlZUZpbGVuYW1lKGJ1Y2tldCwgZGVzaXJlZEZpbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaWxlID0gZGVzaXJlZEZpbGU7XG4gICAgfVxuICAgIGF3YWl0IFNhdmVCdWZmZXJUb1BhdGgoZmlsZSwgbWltZXR5cGUsIGJ1ZmZlcik7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVcGxvYWRGaWxlOiAnICsgZXJyb3IpO1xuICB9XG59XG4iXX0=