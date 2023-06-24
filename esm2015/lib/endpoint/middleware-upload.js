import { __awaiter } from "tslib";
import * as formidable from 'formidable';
import * as fs from 'fs';
export const ParseUploadFile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const form = new formidable.IncomingForm();
        const files = yield new Promise((resolve, reject) => {
            form.parse(req, function (err, fields, fieldFileMap) {
                const fileArray = Object.values(fieldFileMap);
                resolve(fileArray);
            });
        });
        const convertedFiles = yield Promise.all(files.map(f => convertToFileAndBuffer(f)));
        req.files = convertedFiles;
        next();
    }
    catch (error) {
        console.error(error);
        throw new Error(error);
    }
});
function convertToFileAndBuffer(f) {
    return __awaiter(this, void 0, void 0, function* () {
        const fileBuffer = yield new Promise((resolve, reject) => fs.readFile(f.path, function (err, buffer) {
            if (err) {
                reject(err);
            }
            else {
                resolve(buffer);
            }
        }));
        fs.unlinkSync(f.path);
        return {
            buffer: fileBuffer,
            mimetype: f.type,
            originalname: f.name,
            hash: f.hash
        };
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlkZGxld2FyZS11cGxvYWQuanMiLCJzb3VyY2VSb290IjoiL1ZvbHVtZXMvU2hpdmFuZy9QaSBTb2Z0d2FyZS9maWxlLW1hbmFnZXIvbmd4LWZpbGVtYW5hZ2VyL3Byb2plY3RzL25neC1maWxlbWFuYWdlci1hcGktZmlyZWJhc2Uvc3JjLyIsInNvdXJjZXMiOlsibGliL2VuZHBvaW50L21pZGRsZXdhcmUtdXBsb2FkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxPQUFPLEtBQUssVUFBVSxNQUFNLFlBQVksQ0FBQztBQUN6QyxPQUFPLEtBQUssRUFBRSxNQUFNLElBQUksQ0FBQztBQUd6QixNQUFNLENBQUMsTUFBTSxlQUFlLEdBQUcsQ0FBTyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQWtCLEVBQUUsRUFBRTtJQUNwRSxJQUFJO1FBQ0YsTUFBTSxJQUFJLEdBQUcsSUFBSSxVQUFVLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDM0MsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLE9BQU8sQ0FBb0IsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsVUFBUyxHQUFHLEVBQUUsTUFBTSxFQUFFLFlBQW1CO2dCQUN2RCxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBc0IsQ0FBQztnQkFDbkUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3JCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLGNBQWMsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQ3RDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUMxQyxDQUFDO1FBQ0YsR0FBRyxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUM7UUFDM0IsSUFBSSxFQUFFLENBQUM7S0FDUjtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQixNQUFNLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3hCO0FBQ0gsQ0FBQyxDQUFBLENBQUM7QUFFRixTQUFlLHNCQUFzQixDQUNuQyxDQUFrQjs7UUFFbEIsTUFBTSxVQUFVLEdBQUcsTUFBTSxJQUFJLE9BQU8sQ0FBUyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUMvRCxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsVUFBUyxHQUFHLEVBQUUsTUFBTTtZQUN0QyxJQUFJLEdBQUcsRUFBRTtnQkFDUCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDYjtpQkFBTTtnQkFDTCxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDakI7UUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO1FBQ0YsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEIsT0FBTztZQUNMLE1BQU0sRUFBRSxVQUFVO1lBQ2xCLFFBQVEsRUFBRSxDQUFDLENBQUMsSUFBSTtZQUNoQixZQUFZLEVBQUUsQ0FBQyxDQUFDLElBQUk7WUFDcEIsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJO1NBQ2IsQ0FBQztJQUNKLENBQUM7Q0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRGdW5jdGlvbiB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0ICogYXMgZm9ybWlkYWJsZSBmcm9tICdmb3JtaWRhYmxlJztcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcbmltcG9ydCB7IEZpbGVzIH0gZnJvbSAnZm9ybWlkYWJsZSc7XG5cbmV4cG9ydCBjb25zdCBQYXJzZVVwbG9hZEZpbGUgPSBhc3luYyAocmVxLCByZXMsIG5leHQ6IE5leHRGdW5jdGlvbikgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IGZvcm0gPSBuZXcgZm9ybWlkYWJsZS5JbmNvbWluZ0Zvcm0oKTtcbiAgICBjb25zdCBmaWxlcyA9IGF3YWl0IG5ldyBQcm9taXNlPGZvcm1pZGFibGUuRmlsZVtdPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBmb3JtLnBhcnNlKHJlcSwgZnVuY3Rpb24oZXJyLCBmaWVsZHMsIGZpZWxkRmlsZU1hcDogRmlsZXMpIHtcbiAgICAgICAgY29uc3QgZmlsZUFycmF5ID0gT2JqZWN0LnZhbHVlcyhmaWVsZEZpbGVNYXApIGFzIGZvcm1pZGFibGUuRmlsZVtdO1xuICAgICAgICByZXNvbHZlKGZpbGVBcnJheSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBjb25zdCBjb252ZXJ0ZWRGaWxlcyA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgZmlsZXMubWFwKGYgPT4gY29udmVydFRvRmlsZUFuZEJ1ZmZlcihmKSlcbiAgICApO1xuICAgIHJlcS5maWxlcyA9IGNvbnZlcnRlZEZpbGVzO1xuICAgIG5leHQoKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuICB9XG59O1xuXG5hc3luYyBmdW5jdGlvbiBjb252ZXJ0VG9GaWxlQW5kQnVmZmVyKFxuICBmOiBmb3JtaWRhYmxlLkZpbGVcbik6IFByb21pc2U8VXBsb2FkZWRGaWxlPiB7XG4gIGNvbnN0IGZpbGVCdWZmZXIgPSBhd2FpdCBuZXcgUHJvbWlzZTxCdWZmZXI+KChyZXNvbHZlLCByZWplY3QpID0+XG4gICAgZnMucmVhZEZpbGUoZi5wYXRoLCBmdW5jdGlvbihlcnIsIGJ1ZmZlcikge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUoYnVmZmVyKTtcbiAgICAgIH1cbiAgICB9KVxuICApO1xuICBmcy51bmxpbmtTeW5jKGYucGF0aCk7XG4gIHJldHVybiB7XG4gICAgYnVmZmVyOiBmaWxlQnVmZmVyLFxuICAgIG1pbWV0eXBlOiBmLnR5cGUsXG4gICAgb3JpZ2luYWxuYW1lOiBmLm5hbWUsXG4gICAgaGFzaDogZi5oYXNoXG4gIH07XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXBsb2FkZWRGaWxlIHtcbiAgYnVmZmVyOiBCdWZmZXI7XG4gIGhhc2g6IHN0cmluZztcbiAgbWltZXR5cGU6IHN0cmluZztcbiAgb3JpZ2luYWxuYW1lOiBzdHJpbmc7XG59XG4iXX0=