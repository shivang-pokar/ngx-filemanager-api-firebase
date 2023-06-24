import { __awaiter } from "tslib";
import { VError } from 'verror';
import { translateStorageToResFile, translateRawStorage } from '../../utils/translation-helpers';
import { paths } from '../../utils/paths';
const moment = require('moment');
function GetUrl(file) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const in5mins = moment()
                .add(5, 'minutes')
                .toDate();
            const config = { expires: in5mins, action: 'read' };
            const signedResult = yield file.getSignedUrl(config);
            const url = signedResult.shift();
            return url;
        }
        catch (error) {
            throw new VError(error);
        }
    });
}
export function GetSingle(bucket, item, claims) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const actualFilePath = paths.EnsureNoPrefixSlash(item);
            const file = bucket.file(actualFilePath);
            const translatedF = translateRawStorage(file);
            const resFile = yield translateStorageToResFile(translatedF);
            resFile.downloadUrl = yield GetUrl(file);
            return resFile;
        }
        catch (error) {
            throw new VError(error);
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0U2luZ2xlLmpzIiwic291cmNlUm9vdCI6Ii9Wb2x1bWVzL1NoaXZhbmcvUGkgU29mdHdhcmUvZmlsZS1tYW5hZ2VyL25neC1maWxlbWFuYWdlci9wcm9qZWN0cy9uZ3gtZmlsZW1hbmFnZXItYXBpLWZpcmViYXNlL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9hcGkvY29tbWFuZHMvZ2V0U2luZ2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBRWhDLE9BQU8sRUFDTCx5QkFBeUIsRUFDekIsbUJBQW1CLEVBQ3BCLE1BQU0saUNBQWlDLENBQUM7QUFDekMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzFDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUVqQyxTQUFlLE1BQU0sQ0FBQyxJQUFVOztRQUM5QixJQUFJO1lBQ0YsTUFBTSxPQUFPLEdBQUcsTUFBTSxFQUFFO2lCQUNyQixHQUFHLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQztpQkFDakIsTUFBTSxFQUFFLENBQUM7WUFDWixNQUFNLE1BQU0sR0FBdUIsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQztZQUN4RSxNQUFNLFlBQVksR0FBRyxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDckQsTUFBTSxHQUFHLEdBQUcsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2pDLE9BQU8sR0FBRyxDQUFDO1NBQ1o7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE1BQU0sSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDekI7SUFDSCxDQUFDO0NBQUE7QUFFRCxNQUFNLFVBQWdCLFNBQVMsQ0FDN0IsTUFBYyxFQUNkLElBQVksRUFDWixNQUFrQzs7UUFFbEMsSUFBSTtZQUNGLE1BQU0sY0FBYyxHQUFHLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2RCxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ3pDLE1BQU0sV0FBVyxHQUFHLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlDLE1BQU0sT0FBTyxHQUFHLE1BQU0seUJBQXlCLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDN0QsT0FBTyxDQUFDLFdBQVcsR0FBRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6QyxPQUFPLE9BQU8sQ0FBQztTQUNoQjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsTUFBTSxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN6QjtJQUNILENBQUM7Q0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJ1Y2tldCwgRmlsZSB9IGZyb20gJy4uLy4uL3R5cGVzL2dvb2dsZS1jbG91ZC10eXBlcyc7XG5pbXBvcnQgeyBHZXRTaWduZWRVcmxDb25maWcgfSBmcm9tICdAZ29vZ2xlLWNsb3VkL3N0b3JhZ2UnO1xuaW1wb3J0IHsgVkVycm9yIH0gZnJvbSAndmVycm9yJztcbmltcG9ydCB7IENvcmVUeXBlcyB9IGZyb20gJy4uLy4uL3R5cGVzJztcbmltcG9ydCB7XG4gIHRyYW5zbGF0ZVN0b3JhZ2VUb1Jlc0ZpbGUsXG4gIHRyYW5zbGF0ZVJhd1N0b3JhZ2Vcbn0gZnJvbSAnLi4vLi4vdXRpbHMvdHJhbnNsYXRpb24taGVscGVycyc7XG5pbXBvcnQgeyBwYXRocyB9IGZyb20gJy4uLy4uL3V0aWxzL3BhdGhzJztcbmNvbnN0IG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xuXG5hc3luYyBmdW5jdGlvbiBHZXRVcmwoZmlsZTogRmlsZSk6IFByb21pc2U8c3RyaW5nPiB7XG4gIHRyeSB7XG4gICAgY29uc3QgaW41bWlucyA9IG1vbWVudCgpXG4gICAgICAuYWRkKDUsICdtaW51dGVzJylcbiAgICAgIC50b0RhdGUoKTtcbiAgICBjb25zdCBjb25maWc6IEdldFNpZ25lZFVybENvbmZpZyA9IHsgZXhwaXJlczogaW41bWlucywgYWN0aW9uOiAncmVhZCcgfTtcbiAgICBjb25zdCBzaWduZWRSZXN1bHQgPSBhd2FpdCBmaWxlLmdldFNpZ25lZFVybChjb25maWcpO1xuICAgIGNvbnN0IHVybCA9IHNpZ25lZFJlc3VsdC5zaGlmdCgpO1xuICAgIHJldHVybiB1cmw7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgdGhyb3cgbmV3IFZFcnJvcihlcnJvcik7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdldFNpbmdsZShcbiAgYnVja2V0OiBCdWNrZXQsXG4gIGl0ZW06IHN0cmluZyxcbiAgY2xhaW1zOiBDb3JlVHlwZXMuVXNlckN1c3RvbUNsYWltc1xuKTogUHJvbWlzZTxDb3JlVHlwZXMuUmVzRmlsZT4ge1xuICB0cnkge1xuICAgIGNvbnN0IGFjdHVhbEZpbGVQYXRoID0gcGF0aHMuRW5zdXJlTm9QcmVmaXhTbGFzaChpdGVtKTtcbiAgICBjb25zdCBmaWxlID0gYnVja2V0LmZpbGUoYWN0dWFsRmlsZVBhdGgpO1xuICAgIGNvbnN0IHRyYW5zbGF0ZWRGID0gdHJhbnNsYXRlUmF3U3RvcmFnZShmaWxlKTtcbiAgICBjb25zdCByZXNGaWxlID0gYXdhaXQgdHJhbnNsYXRlU3RvcmFnZVRvUmVzRmlsZSh0cmFuc2xhdGVkRik7XG4gICAgcmVzRmlsZS5kb3dubG9hZFVybCA9IGF3YWl0IEdldFVybChmaWxlKTtcbiAgICByZXR1cm4gcmVzRmlsZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICB0aHJvdyBuZXcgVkVycm9yKGVycm9yKTtcbiAgfVxufVxuIl19