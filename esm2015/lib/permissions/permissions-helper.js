import { __awaiter } from "tslib";
import { VError } from 'verror';
function SetMetaPropertyString(file, key, newValueString) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const metaObj = { metadata: {} };
            metaObj.metadata[key] = newValueString;
            const res = yield file.setMetadata(metaObj);
            return res[0];
        }
        catch (error) {
            let fileExists;
            try {
                [fileExists] = yield file.exists();
            }
            catch (e) {
                console.error('storage-helper: SetMetaProperty() error getting file.exists', e);
            }
            console.error('storage-helper: SetMetaProperty() error setting meta', {
                fileExists,
                filePath: file.name,
                newValueString
            });
            throw new Error(error);
        }
    });
}
function SetMetaPropertyObj(file, key, newValue) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newValueString = JSON.stringify(newValue);
            return SetMetaPropertyString(file, key, newValueString);
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
function GetMetaPropertyString(file, key) {
    return __awaiter(this, void 0, void 0, function* () {
        let newValueString;
        try {
            const [meta] = yield file.getMetadata();
            const metaData = meta.metadata || {};
            newValueString = metaData[key] || null;
            return newValueString;
        }
        catch (error) {
            try {
                const [fileExists] = yield file.exists();
            }
            catch (error) {
                console.error(error);
            }
            console.error('storage-helper: GetMetaProperty() error getting meta', {});
            throw new VError(error);
        }
    });
}
function GetMetaPropertyObj(file, key) {
    return __awaiter(this, void 0, void 0, function* () {
        let newValueString;
        try {
            newValueString = yield GetMetaPropertyString(file, key);
            const newValueObj = JSON.parse(newValueString);
            return newValueObj;
        }
        catch (error) {
            console.error(`could not convert the meta property "${key}" to a JSON object`, error, { newValueString });
            throw new VError(error + ' error in JSON processing: ' + newValueString);
        }
    });
}
export const permHelper = {
    GetMetaPropertyObj: GetMetaPropertyObj,
    SetMetaPropertyObj: SetMetaPropertyObj,
    GetMetaPropertyString: GetMetaPropertyString,
    SetMetaPropertyString: SetMetaPropertyString,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVybWlzc2lvbnMtaGVscGVyLmpzIiwic291cmNlUm9vdCI6Ii9Wb2x1bWVzL1NoaXZhbmcvUGkgU29mdHdhcmUvZmlsZS1tYW5hZ2VyL25neC1maWxlbWFuYWdlci9wcm9qZWN0cy9uZ3gtZmlsZW1hbmFnZXItYXBpLWZpcmViYXNlL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9wZXJtaXNzaW9ucy9wZXJtaXNzaW9ucy1oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFJaEMsU0FBZSxxQkFBcUIsQ0FDbEMsSUFBVSxFQUNWLEdBQVcsRUFDWCxjQUFzQjs7UUFFdEIsSUFBSTtZQUNGLE1BQU0sT0FBTyxHQUFHLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxDQUFDO1lBQ2pDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsY0FBYyxDQUFDO1lBQ3ZDLE1BQU0sR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM1QyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNmO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxJQUFJLFVBQW1CLENBQUM7WUFDeEIsSUFBSTtnQkFDRixDQUFDLFVBQVUsQ0FBQyxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ3BDO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1YsT0FBTyxDQUFDLEtBQUssQ0FDWCw2REFBNkQsRUFDN0QsQ0FBQyxDQUNGLENBQUM7YUFDSDtZQUNELE9BQU8sQ0FBQyxLQUFLLENBQUMsc0RBQXNELEVBQUU7Z0JBQ3BFLFVBQVU7Z0JBQ1YsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJO2dCQUNuQixjQUFjO2FBQ2YsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN4QjtJQUNILENBQUM7Q0FBQTtBQUVELFNBQWUsa0JBQWtCLENBQy9CLElBQVUsRUFDVixHQUFXLEVBQ1gsUUFBWTs7UUFFWixJQUFJO1lBQ0YsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNoRCxPQUFPLHFCQUFxQixDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsY0FBYyxDQUFDLENBQUM7U0FDekQ7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE1BQU0sSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDeEI7SUFDSCxDQUFDO0NBQUE7QUFFRCxTQUFlLHFCQUFxQixDQUFDLElBQVUsRUFBRSxHQUFXOztRQUMxRCxJQUFJLGNBQWMsQ0FBQztRQUNuQixJQUFJO1lBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3hDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDO1lBQ3JDLGNBQWMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDO1lBQ3ZDLE9BQU8sY0FBYyxDQUFDO1NBQ3ZCO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxJQUFJO2dCQUNGLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUMxQztZQUFDLE9BQU8sS0FBSyxFQUFFO2dCQUNkLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdEI7WUFDRCxPQUFPLENBQUMsS0FBSyxDQUFDLHNEQUFzRCxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzFFLE1BQU0sSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDekI7SUFDSCxDQUFDO0NBQUE7QUFFRCxTQUFlLGtCQUFrQixDQUFJLElBQVUsRUFBRSxHQUFXOztRQUMxRCxJQUFJLGNBQWMsQ0FBQztRQUNuQixJQUFJO1lBQ0YsY0FBYyxHQUFHLE1BQU0scUJBQXFCLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3hELE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDL0MsT0FBTyxXQUFXLENBQUM7U0FDcEI7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE9BQU8sQ0FBQyxLQUFLLENBQ1gsd0NBQXdDLEdBQUcsb0JBQW9CLEVBQy9ELEtBQUssRUFDTCxFQUFFLGNBQWMsRUFBRSxDQUNuQixDQUFDO1lBQ0YsTUFBTSxJQUFJLE1BQU0sQ0FBQyxLQUFLLEdBQUcsNkJBQTZCLEdBQUcsY0FBYyxDQUFDLENBQUM7U0FDMUU7SUFDSCxDQUFDO0NBQUE7QUFFRCxNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUc7SUFDeEIsa0JBQWtCLEVBQUUsa0JBQWtCO0lBQ3RDLGtCQUFrQixFQUFFLGtCQUFrQjtJQUN0QyxxQkFBcUIsRUFBRSxxQkFBcUI7SUFDNUMscUJBQXFCLEVBQUUscUJBQXFCO0NBQzdDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWRXJyb3IgfSBmcm9tICd2ZXJyb3InO1xuaW1wb3J0IHsgRmlsZSB9IGZyb20gJy4uL3R5cGVzL2dvb2dsZS1jbG91ZC10eXBlcyc7XG5pbXBvcnQgeyBTZXRNZXRhZGF0YVJlc3BvbnNlIH0gZnJvbSAnQGdvb2dsZS1jbG91ZC9jb21tb24nO1xuXG5hc3luYyBmdW5jdGlvbiBTZXRNZXRhUHJvcGVydHlTdHJpbmcoXG4gIGZpbGU6IEZpbGUsXG4gIGtleTogc3RyaW5nLFxuICBuZXdWYWx1ZVN0cmluZzogc3RyaW5nXG4pOiBQcm9taXNlPGFueT4ge1xuICB0cnkge1xuICAgIGNvbnN0IG1ldGFPYmogPSB7IG1ldGFkYXRhOiB7fSB9O1xuICAgIG1ldGFPYmoubWV0YWRhdGFba2V5XSA9IG5ld1ZhbHVlU3RyaW5nO1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZpbGUuc2V0TWV0YWRhdGEobWV0YU9iaik7XG4gICAgcmV0dXJuIHJlc1swXTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBsZXQgZmlsZUV4aXN0czogYm9vbGVhbjtcbiAgICB0cnkge1xuICAgICAgW2ZpbGVFeGlzdHNdID0gYXdhaXQgZmlsZS5leGlzdHMoKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAnc3RvcmFnZS1oZWxwZXI6IFNldE1ldGFQcm9wZXJ0eSgpIGVycm9yIGdldHRpbmcgZmlsZS5leGlzdHMnLFxuICAgICAgICBlXG4gICAgICApO1xuICAgIH1cbiAgICBjb25zb2xlLmVycm9yKCdzdG9yYWdlLWhlbHBlcjogU2V0TWV0YVByb3BlcnR5KCkgZXJyb3Igc2V0dGluZyBtZXRhJywge1xuICAgICAgZmlsZUV4aXN0cyxcbiAgICAgIGZpbGVQYXRoOiBmaWxlLm5hbWUsXG4gICAgICBuZXdWYWx1ZVN0cmluZ1xuICAgIH0pO1xuICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gU2V0TWV0YVByb3BlcnR5T2JqKFxuICBmaWxlOiBGaWxlLFxuICBrZXk6IHN0cmluZyxcbiAgbmV3VmFsdWU6IHt9XG4pOiBQcm9taXNlPHt9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgbmV3VmFsdWVTdHJpbmcgPSBKU09OLnN0cmluZ2lmeShuZXdWYWx1ZSk7XG4gICAgcmV0dXJuIFNldE1ldGFQcm9wZXJ0eVN0cmluZyhmaWxlLCBrZXksIG5ld1ZhbHVlU3RyaW5nKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIEdldE1ldGFQcm9wZXJ0eVN0cmluZyhmaWxlOiBGaWxlLCBrZXk6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gIGxldCBuZXdWYWx1ZVN0cmluZztcbiAgdHJ5IHtcbiAgICBjb25zdCBbbWV0YV0gPSBhd2FpdCBmaWxlLmdldE1ldGFkYXRhKCk7XG4gICAgY29uc3QgbWV0YURhdGEgPSBtZXRhLm1ldGFkYXRhIHx8IHt9O1xuICAgIG5ld1ZhbHVlU3RyaW5nID0gbWV0YURhdGFba2V5XSB8fCBudWxsO1xuICAgIHJldHVybiBuZXdWYWx1ZVN0cmluZztcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgW2ZpbGVFeGlzdHNdID0gYXdhaXQgZmlsZS5leGlzdHMoKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgfVxuICAgIGNvbnNvbGUuZXJyb3IoJ3N0b3JhZ2UtaGVscGVyOiBHZXRNZXRhUHJvcGVydHkoKSBlcnJvciBnZXR0aW5nIG1ldGEnLCB7fSk7XG4gICAgdGhyb3cgbmV3IFZFcnJvcihlcnJvcik7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gR2V0TWV0YVByb3BlcnR5T2JqPFQ+KGZpbGU6IEZpbGUsIGtleTogc3RyaW5nKTogUHJvbWlzZTxUPiB7XG4gIGxldCBuZXdWYWx1ZVN0cmluZztcbiAgdHJ5IHtcbiAgICBuZXdWYWx1ZVN0cmluZyA9IGF3YWl0IEdldE1ldGFQcm9wZXJ0eVN0cmluZyhmaWxlLCBrZXkpO1xuICAgIGNvbnN0IG5ld1ZhbHVlT2JqID0gSlNPTi5wYXJzZShuZXdWYWx1ZVN0cmluZyk7XG4gICAgcmV0dXJuIG5ld1ZhbHVlT2JqO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICBgY291bGQgbm90IGNvbnZlcnQgdGhlIG1ldGEgcHJvcGVydHkgXCIke2tleX1cIiB0byBhIEpTT04gb2JqZWN0YCxcbiAgICAgIGVycm9yLFxuICAgICAgeyBuZXdWYWx1ZVN0cmluZyB9XG4gICAgKTtcbiAgICB0aHJvdyBuZXcgVkVycm9yKGVycm9yICsgJyBlcnJvciBpbiBKU09OIHByb2Nlc3Npbmc6ICcgKyBuZXdWYWx1ZVN0cmluZyk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHBlcm1IZWxwZXIgPSB7XG4gIEdldE1ldGFQcm9wZXJ0eU9iajogR2V0TWV0YVByb3BlcnR5T2JqLFxuICBTZXRNZXRhUHJvcGVydHlPYmo6IFNldE1ldGFQcm9wZXJ0eU9iaixcbiAgR2V0TWV0YVByb3BlcnR5U3RyaW5nOiBHZXRNZXRhUHJvcGVydHlTdHJpbmcsXG4gIFNldE1ldGFQcm9wZXJ0eVN0cmluZzogU2V0TWV0YVByb3BlcnR5U3RyaW5nLFxufTtcbiJdfQ==