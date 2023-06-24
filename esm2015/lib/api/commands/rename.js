import { __awaiter } from "tslib";
import { VError } from 'verror';
import { paths } from '../../utils/paths';
import { storage } from '../../utils/storage-helper';
import { ResultsObjFromArray } from '../../utils/translation-helpers';
export function RenameFile(bucket, inputSrc, inputDest, claims) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const parsedSrc = paths.EnsureNoPrefixSlash(inputSrc);
            const parsedDest = paths.EnsureNoPrefixSlash(inputDest);
            const fileItem = bucket.file(parsedSrc);
            const [exists] = yield fileItem.exists();
            if (!exists) {
                throw new Error(`
item: "${fileItem.name}" does not exist
bucket: "${bucket.name}"

inputSrc: "${inputSrc}",
inputDest: "${inputDest}",

parsedSrc: "${parsedSrc}",
parsedDest: "${parsedDest}",
`);
            }
            const isFile = !inputSrc.endsWith('/');
            if (isFile) {
                const resultObj = yield storage.TryRenameFile(fileItem, parsedSrc, parsedDest);
                return resultObj;
            }
            const allChildren = yield storage.GetAllChildrenWithPrefix(bucket, parsedSrc);
            const moveResults = yield Promise.all(allChildren.map(f => storage.TryRenameFile(f, parsedSrc, parsedDest)));
            return ResultsObjFromArray(moveResults);
        }
        catch (error) {
            throw new VError(error);
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuYW1lLmpzIiwic291cmNlUm9vdCI6Ii9Wb2x1bWVzL1NoaXZhbmcvUGkgU29mdHdhcmUvZmlsZS1tYW5hZ2VyL25neC1maWxlbWFuYWdlci9wcm9qZWN0cy9uZ3gtZmlsZW1hbmFnZXItYXBpLWZpcmViYXNlL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9hcGkvY29tbWFuZHMvcmVuYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ2hDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMxQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDckQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFdEUsTUFBTSxVQUFnQixVQUFVLENBQzlCLE1BQWMsRUFDZCxRQUFnQixFQUNoQixTQUFpQixFQUNqQixNQUFrQzs7UUFFbEMsSUFBSTtZQUNGLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN0RCxNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDeEQsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN4QyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsTUFBTSxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDekMsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDWCxNQUFNLElBQUksS0FBSyxDQUFDO1NBQ2IsUUFBUSxDQUFDLElBQUk7V0FDWCxNQUFNLENBQUMsSUFBSTs7YUFFVCxRQUFRO2NBQ1AsU0FBUzs7Y0FFVCxTQUFTO2VBQ1IsVUFBVTtDQUN4QixDQUFDLENBQUM7YUFDRTtZQUNELE1BQU0sTUFBTSxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN2QyxJQUFJLE1BQU0sRUFBRTtnQkFDVixNQUFNLFNBQVMsR0FBRyxNQUFNLE9BQU8sQ0FBQyxhQUFhLENBQzNDLFFBQVEsRUFDUixTQUFTLEVBQ1QsVUFBVSxDQUNYLENBQUM7Z0JBQ0YsT0FBTyxTQUFTLENBQUM7YUFDbEI7WUFDRCxNQUFNLFdBQVcsR0FBRyxNQUFNLE9BQU8sQ0FBQyx3QkFBd0IsQ0FDeEQsTUFBTSxFQUNOLFNBQVMsQ0FDVixDQUFDO1lBQ0YsTUFBTSxXQUFXLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUNuQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUUsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQ3RFLENBQUM7WUFDRixPQUFPLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ3pDO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxNQUFNLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQztDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQnVja2V0IH0gZnJvbSAnLi4vLi4vdHlwZXMvZ29vZ2xlLWNsb3VkLXR5cGVzJztcbmltcG9ydCB7IENvcmVUeXBlcyB9IGZyb20gJy4uLy4uL3R5cGVzJztcbmltcG9ydCB7IFZFcnJvciB9IGZyb20gJ3ZlcnJvcic7XG5pbXBvcnQgeyBwYXRocyB9IGZyb20gJy4uLy4uL3V0aWxzL3BhdGhzJztcbmltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tICcuLi8uLi91dGlscy9zdG9yYWdlLWhlbHBlcic7XG5pbXBvcnQgeyBSZXN1bHRzT2JqRnJvbUFycmF5IH0gZnJvbSAnLi4vLi4vdXRpbHMvdHJhbnNsYXRpb24taGVscGVycyc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBSZW5hbWVGaWxlKFxuICBidWNrZXQ6IEJ1Y2tldCxcbiAgaW5wdXRTcmM6IHN0cmluZyxcbiAgaW5wdXREZXN0OiBzdHJpbmcsXG4gIGNsYWltczogQ29yZVR5cGVzLlVzZXJDdXN0b21DbGFpbXNcbikge1xuICB0cnkge1xuICAgIGNvbnN0IHBhcnNlZFNyYyA9IHBhdGhzLkVuc3VyZU5vUHJlZml4U2xhc2goaW5wdXRTcmMpO1xuICAgIGNvbnN0IHBhcnNlZERlc3QgPSBwYXRocy5FbnN1cmVOb1ByZWZpeFNsYXNoKGlucHV0RGVzdCk7XG4gICAgY29uc3QgZmlsZUl0ZW0gPSBidWNrZXQuZmlsZShwYXJzZWRTcmMpO1xuICAgIGNvbnN0IFtleGlzdHNdID0gYXdhaXQgZmlsZUl0ZW0uZXhpc3RzKCk7XG4gICAgaWYgKCFleGlzdHMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgXG5pdGVtOiBcIiR7ZmlsZUl0ZW0ubmFtZX1cIiBkb2VzIG5vdCBleGlzdFxuYnVja2V0OiBcIiR7YnVja2V0Lm5hbWV9XCJcblxuaW5wdXRTcmM6IFwiJHtpbnB1dFNyY31cIixcbmlucHV0RGVzdDogXCIke2lucHV0RGVzdH1cIixcblxucGFyc2VkU3JjOiBcIiR7cGFyc2VkU3JjfVwiLFxucGFyc2VkRGVzdDogXCIke3BhcnNlZERlc3R9XCIsXG5gKTtcbiAgICB9XG4gICAgY29uc3QgaXNGaWxlID0gIWlucHV0U3JjLmVuZHNXaXRoKCcvJyk7XG4gICAgaWYgKGlzRmlsZSkge1xuICAgICAgY29uc3QgcmVzdWx0T2JqID0gYXdhaXQgc3RvcmFnZS5UcnlSZW5hbWVGaWxlKFxuICAgICAgICBmaWxlSXRlbSxcbiAgICAgICAgcGFyc2VkU3JjLFxuICAgICAgICBwYXJzZWREZXN0XG4gICAgICApO1xuICAgICAgcmV0dXJuIHJlc3VsdE9iajtcbiAgICB9XG4gICAgY29uc3QgYWxsQ2hpbGRyZW4gPSBhd2FpdCBzdG9yYWdlLkdldEFsbENoaWxkcmVuV2l0aFByZWZpeChcbiAgICAgIGJ1Y2tldCxcbiAgICAgIHBhcnNlZFNyY1xuICAgICk7XG4gICAgY29uc3QgbW92ZVJlc3VsdHMgPSBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIGFsbENoaWxkcmVuLm1hcChmID0+IHN0b3JhZ2UuVHJ5UmVuYW1lRmlsZShmLCBwYXJzZWRTcmMsIHBhcnNlZERlc3QpKVxuICAgICk7XG4gICAgcmV0dXJuIFJlc3VsdHNPYmpGcm9tQXJyYXkobW92ZVJlc3VsdHMpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHRocm93IG5ldyBWRXJyb3IoZXJyb3IpO1xuICB9XG59XG4iXX0=