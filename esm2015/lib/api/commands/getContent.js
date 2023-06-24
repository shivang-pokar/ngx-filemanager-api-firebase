import { __awaiter } from "tslib";
import { StreamToPromise } from '../../utils/translation-helpers';
import { VError } from 'verror';
export function GetFileContent(bucket, item, claims) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield bucket.file(item).get();
            const file = result[0];
            const content = yield StreamToPromise(file.createReadStream());
            return content;
        }
        catch (error) {
            throw new VError(error);
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0Q29udGVudC5qcyIsInNvdXJjZVJvb3QiOiIvVm9sdW1lcy9TaGl2YW5nL1BpIFNvZnR3YXJlL2ZpbGUtbWFuYWdlci9uZ3gtZmlsZW1hbmFnZXIvcHJvamVjdHMvbmd4LWZpbGVtYW5hZ2VyLWFwaS1maXJlYmFzZS9zcmMvIiwic291cmNlcyI6WyJsaWIvYXBpL2NvbW1hbmRzL2dldENvbnRlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUVsRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBRWhDLE1BQU0sVUFBZ0IsY0FBYyxDQUNsQyxNQUFjLEVBQ2QsSUFBWSxFQUNaLE1BQWtDOztRQUVsQyxJQUFJO1lBQ0YsTUFBTSxNQUFNLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQzdDLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QixNQUFNLE9BQU8sR0FBRyxNQUFNLGVBQWUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO1lBQy9ELE9BQU8sT0FBTyxDQUFDO1NBQ2hCO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxNQUFNLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQztDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQnVja2V0IH0gZnJvbSAnLi4vLi4vdHlwZXMvZ29vZ2xlLWNsb3VkLXR5cGVzJztcbmltcG9ydCB7IFN0cmVhbVRvUHJvbWlzZSB9IGZyb20gJy4uLy4uL3V0aWxzL3RyYW5zbGF0aW9uLWhlbHBlcnMnO1xuaW1wb3J0IHsgQ29yZVR5cGVzIH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xuaW1wb3J0IHsgVkVycm9yIH0gZnJvbSAndmVycm9yJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdldEZpbGVDb250ZW50KFxuICBidWNrZXQ6IEJ1Y2tldCxcbiAgaXRlbTogc3RyaW5nLFxuICBjbGFpbXM6IENvcmVUeXBlcy5Vc2VyQ3VzdG9tQ2xhaW1zXG4pIHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBidWNrZXQuZmlsZShpdGVtKS5nZXQoKTtcbiAgICBjb25zdCBmaWxlID0gcmVzdWx0WzBdO1xuICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCBTdHJlYW1Ub1Byb21pc2UoZmlsZS5jcmVhdGVSZWFkU3RyZWFtKCkpO1xuICAgIHJldHVybiBjb250ZW50O1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHRocm93IG5ldyBWRXJyb3IoZXJyb3IpO1xuICB9XG59XG4iXX0=