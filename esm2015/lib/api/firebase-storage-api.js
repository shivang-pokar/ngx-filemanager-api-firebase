import { __awaiter } from "tslib";
import { commands } from './commands';
import { VError } from 'verror';
function CheckHasBodyProp(body, bodyFieldName) {
    return __awaiter(this, void 0, void 0, function* () {
        const exists = body[bodyFieldName];
        if (!exists) {
            throw new Error(`Request is missing property in req.body: '${bodyFieldName}'`);
        }
    });
}
export class NgxFileMangerApiFireBaseClass {
    constructor(storage) {
        this.storage = storage;
    }
    getBucket(bucketname) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!bucketname) {
                throw new Error(`Request is missing property in req.body: 'bucketname'`);
            }
            try {
                const bucket = this.storage.bucket(bucketname);
                const exists = (yield bucket.exists()).shift();
                if (!exists) {
                    throw new Error(`bucket: "${bucketname}" doesn't exist, please create it first`);
                }
                return bucket;
            }
            catch (error) {
                throw new Error('Error retrieving bucket: ' + error.message);
            }
        });
    }
    HandleList(body, claims) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield CheckHasBodyProp(body, 'path');
                const bucket = yield this.getBucket(body.bucketname);
                const resFiles = yield commands.GetList(bucket, body.path, claims, body.isAdmin);
                const response = {
                    result: resFiles
                };
                return response;
            }
            catch (error) {
                throw new VError(error);
            }
        });
    }
    HandleRename(body, claims) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield CheckHasBodyProp(body, 'item');
                yield CheckHasBodyProp(body, 'newItemPath');
                const bucket = yield this.getBucket(body.bucketname);
                const result = yield commands.RenameFile(bucket, body.item, body.newItemPath, claims);
                const response = {
                    result: result
                };
                return response;
            }
            catch (error) {
                throw new VError(error);
            }
        });
    }
    HandleMove(body, claims) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bucket = yield this.getBucket(body.bucketname);
                yield CheckHasBodyProp(body, 'items');
                yield CheckHasBodyProp(body, 'newPath');
                const result = yield commands.MoveFiles(bucket, body.items, body.newPath, claims);
                const response = {
                    result: result
                };
                return response;
            }
            catch (error) {
                throw new VError(error);
            }
        });
    }
    HandleCopy(body, claims) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield CheckHasBodyProp(body, 'newPath');
                const bucket = yield this.getBucket(body.bucketname);
                let filesToCopy;
                if (body.items) {
                    filesToCopy = body.items;
                }
                else if (body.singleFileName) {
                    filesToCopy = [body.singleFileName];
                }
                else {
                    throw new Error('Request does not contain either body.items or body.singleFileName');
                }
                const result = yield commands.CopyFiles(bucket, filesToCopy, body.newPath, claims);
                const response = {
                    result: result
                };
                return response;
            }
            catch (error) {
                throw new VError(error);
            }
        });
    }
    HandleRemove(body, claims) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield CheckHasBodyProp(body, 'items');
                const bucket = yield this.getBucket(body.bucketname);
                const result = yield commands.RemoveFiles(bucket, body.items, claims);
                const response = {
                    result: result
                };
                return response;
            }
            catch (error) {
                throw new VError(error);
            }
        });
    }
    HandleEdit(body, claims) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield CheckHasBodyProp(body, 'item');
                yield CheckHasBodyProp(body, 'content');
                const bucket = yield this.getBucket(body.bucketname);
                const result = yield commands.EditFile(bucket, body.item, body.content, claims);
                const response = {
                    result: result
                };
                return response;
            }
            catch (error) {
                throw new VError(error);
            }
        });
    }
    HandleGetContent(body, claims) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield CheckHasBodyProp(body, 'item');
                const bucket = yield this.getBucket(body.bucketname);
                const result = yield commands.GetFileContent(bucket, body.item, claims);
                const response = {
                    result: result
                };
                return response;
            }
            catch (error) {
                throw new VError(error);
            }
        });
    }
    HandleGetSingle(body, claims) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield CheckHasBodyProp(body, 'item');
                const bucket = yield this.getBucket(body.bucketname);
                const file = yield commands.GetSingle(bucket, body.item, claims);
                const response = {
                    result: {
                        success: true,
                        file: file,
                        url: file.downloadUrl
                    }
                };
                return response;
            }
            catch (error) {
                throw new VError(error);
            }
        });
    }
    HandleCreateFolder(body, claims) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield CheckHasBodyProp(body, 'newPath');
                const bucket = yield this.getBucket(body.bucketname);
                const result = yield commands.CreateFolder(bucket, body.newPath, claims, body.disableNoClobber, body.isAdmin);
                const response = {
                    result: result
                };
                return response;
            }
            catch (error) {
                throw new VError(error);
            }
        });
    }
    HandleSetPermissions(body, claims) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield CheckHasBodyProp(body, 'items');
                yield CheckHasBodyProp(body, 'role');
                yield CheckHasBodyProp(body, 'entity');
                const bucket = yield this.getBucket(body.bucketname);
                const result = yield commands.ChangePermissions(bucket, body.items, body.role, body.entity, body.recursive, claims);
                const response = {
                    result: result
                };
                return response;
            }
            catch (error) {
                throw new VError(error.message);
            }
        });
    }
    HandleSetPermissionsObject(body, claims) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield CheckHasBodyProp(body, 'items');
                yield CheckHasBodyProp(body, 'permissionsObj');
                const bucket = yield this.getBucket(body.bucketname);
                const result = yield commands.ChangePermissionsObject(bucket, body.items, body.permissionsObj, body.recursive, claims);
                const response = {
                    result: result
                };
                return response;
            }
            catch (error) {
                throw new VError(error.message);
            }
        });
    }
    HandleSaveFile(bucketname, directoryPath, originalname, mimetype, buffer, claims) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bucket = yield this.getBucket(bucketname);
                yield commands.UploadFile(bucket, directoryPath, originalname, mimetype, buffer, claims);
                const result = {
                    result: {
                        success: true
                    }
                };
                return result;
            }
            catch (error) {
                throw new VError(error);
            }
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2Utc3RvcmFnZS1hcGkuanMiLCJzb3VyY2VSb290IjoiL1ZvbHVtZXMvU2hpdmFuZy9QaSBTb2Z0d2FyZS9maWxlLW1hbmFnZXIvbmd4LWZpbGVtYW5hZ2VyL3Byb2plY3RzL25neC1maWxlbWFuYWdlci1hcGktZmlyZWJhc2Uvc3JjLyIsInNvdXJjZXMiOlsibGliL2FwaS9maXJlYmFzZS1zdG9yYWdlLWFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUN0QyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBRWhDLFNBQWUsZ0JBQWdCLENBQUMsSUFBUSxFQUFFLGFBQXFCOztRQUM3RCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNYLE1BQU0sSUFBSSxLQUFLLENBQ2IsNkNBQTZDLGFBQWEsR0FBRyxDQUM5RCxDQUFDO1NBQ0g7SUFDSCxDQUFDO0NBQUE7QUFFRCxNQUFNLE9BQU8sNkJBQTZCO0lBQ3hDLFlBQW1CLE9BQWdCO1FBQWhCLFlBQU8sR0FBUCxPQUFPLENBQVM7SUFBRyxDQUFDO0lBRXpCLFNBQVMsQ0FBQyxVQUFrQjs7WUFDeEMsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDZixNQUFNLElBQUksS0FBSyxDQUFDLHVEQUF1RCxDQUFDLENBQUM7YUFDMUU7WUFDRCxJQUFJO2dCQUNGLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUMvQyxNQUFNLE1BQU0sR0FBRyxDQUFDLE1BQU0sTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQy9DLElBQUksQ0FBQyxNQUFNLEVBQUU7b0JBQ1gsTUFBTSxJQUFJLEtBQUssQ0FDYixZQUFZLFVBQVUseUNBQXlDLENBQ2hF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LENBQ25ELE1BQU0sRUFDTixJQUFJLENBQUMsS0FBSyxFQUNWLElBQUksQ0FBQyxjQUFjLEVBQ25CLElBQUksQ0FBQyxTQUFTLEVBQ2QsTUFBTSxDQUNQLENBQUM7Z0JBQ0YsTUFBTSxRQUFRLEdBQW9DO29CQUNoRCxNQUFNLEVBQUUsTUFBTTtpQkFDZixDQUFDO2dCQUNGLE9BQU8sUUFBUSxDQUFDO2FBQ2pCO1lBQUMsT0FBTyxLQUFLLEVBQUU7Z0JBQ2QsTUFBTSxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDakM7UUFDSCxDQUFDO0tBQUE7SUFFSyxjQUFjLENBQ2xCLFVBQWtCLEVBQ2xCLGFBQXFCLEVBQ3JCLFlBQW9CLEVBQ3BCLFFBQWdCLEVBQ2hCLE1BQWMsRUFDZCxNQUFrQzs7WUFFbEMsSUFBSTtnQkFDRixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ2hELE1BQU0sUUFBUSxDQUFDLFVBQVUsQ0FDdkIsTUFBTSxFQUNOLGFBQWEsRUFDYixZQUFZLEVBQ1osUUFBUSxFQUNSLE1BQU0sRUFDTixNQUFNLENBQ1AsQ0FBQztnQkFDRixNQUFNLE1BQU0sR0FBRztvQkFDYixNQUFNLEVBQUU7d0JBQ04sT0FBTyxFQUFFLElBQUk7cUJBQ2Q7aUJBQ0YsQ0FBQztnQkFDRixPQUFPLE1BQU0sQ0FBQzthQUNmO1lBQUMsT0FBTyxLQUFLLEVBQUU7Z0JBQ2QsTUFBTSxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN6QjtRQUNILENBQUM7S0FBQTtDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RvcmFnZSwgQnVja2V0IH0gZnJvbSAnLi4vdHlwZXMvZ29vZ2xlLWNsb3VkLXR5cGVzJztcbmltcG9ydCB7IGNvbW1hbmRzIH0gZnJvbSAnLi9jb21tYW5kcyc7XG5pbXBvcnQgeyBWRXJyb3IgfSBmcm9tICd2ZXJyb3InO1xuaW1wb3J0IHsgQ29yZVR5cGVzIH0gZnJvbSAnLi4vdHlwZXMnO1xuYXN5bmMgZnVuY3Rpb24gQ2hlY2tIYXNCb2R5UHJvcChib2R5OiB7fSwgYm9keUZpZWxkTmFtZTogc3RyaW5nKSB7XG4gIGNvbnN0IGV4aXN0cyA9IGJvZHlbYm9keUZpZWxkTmFtZV07XG4gIGlmICghZXhpc3RzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYFJlcXVlc3QgaXMgbWlzc2luZyBwcm9wZXJ0eSBpbiByZXEuYm9keTogJyR7Ym9keUZpZWxkTmFtZX0nYFxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIE5neEZpbGVNYW5nZXJBcGlGaXJlQmFzZUNsYXNzIHtcbiAgY29uc3RydWN0b3IocHVibGljIHN0b3JhZ2U6IFN0b3JhZ2UpIHt9XG5cbiAgcHJpdmF0ZSBhc3luYyBnZXRCdWNrZXQoYnVja2V0bmFtZTogc3RyaW5nKTogUHJvbWlzZTxCdWNrZXQ+IHtcbiAgICBpZiAoIWJ1Y2tldG5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUmVxdWVzdCBpcyBtaXNzaW5nIHByb3BlcnR5IGluIHJlcS5ib2R5OiAnYnVja2V0bmFtZSdgKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGJ1Y2tldCA9IHRoaXMuc3RvcmFnZS5idWNrZXQoYnVja2V0bmFtZSk7XG4gICAgICBjb25zdCBleGlzdHMgPSAoYXdhaXQgYnVja2V0LmV4aXN0cygpKS5zaGlmdCgpO1xuICAgICAgaWYgKCFleGlzdHMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIGBidWNrZXQ6IFwiJHtidWNrZXRuYW1lfVwiIGRvZXNuJ3QgZXhpc3QsIHBsZWFzZSBjcmVhdGUgaXQgZmlyc3RgXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYnVja2V0O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Vycm9yIHJldHJpZXZpbmcgYnVja2V0OiAnICsgZXJyb3IubWVzc2FnZSk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgSGFuZGxlTGlzdChcbiAgICBib2R5OiBDb3JlVHlwZXMuUmVxQm9keUxpc3QsXG4gICAgY2xhaW1zOiBDb3JlVHlwZXMuVXNlckN1c3RvbUNsYWltc1xuICApOiBQcm9taXNlPENvcmVUeXBlcy5SZXNCb2R5TGlzdD4ge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBDaGVja0hhc0JvZHlQcm9wKGJvZHksICdwYXRoJyk7XG4gICAgICBjb25zdCBidWNrZXQgPSBhd2FpdCB0aGlzLmdldEJ1Y2tldChib2R5LmJ1Y2tldG5hbWUpO1xuICAgICAgY29uc3QgcmVzRmlsZXMgPSBhd2FpdCBjb21tYW5kcy5HZXRMaXN0KFxuICAgICAgICBidWNrZXQsXG4gICAgICAgIGJvZHkucGF0aCxcbiAgICAgICAgY2xhaW1zLFxuICAgICAgICBib2R5LmlzQWRtaW5cbiAgICAgICk7XG4gICAgICBjb25zdCByZXNwb25zZTogQ29yZVR5cGVzLlJlc0JvZHlMaXN0ID0ge1xuICAgICAgICByZXN1bHQ6IHJlc0ZpbGVzXG4gICAgICB9O1xuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aHJvdyBuZXcgVkVycm9yKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBIYW5kbGVSZW5hbWUoXG4gICAgYm9keTogQ29yZVR5cGVzLlJlcUJvZHlSZW5hbWUsXG4gICAgY2xhaW1zOiBDb3JlVHlwZXMuVXNlckN1c3RvbUNsYWltc1xuICApOiBQcm9taXNlPENvcmVUeXBlcy5SZXNCb2R5UmVuYW1lPiB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IENoZWNrSGFzQm9keVByb3AoYm9keSwgJ2l0ZW0nKTtcbiAgICAgIGF3YWl0IENoZWNrSGFzQm9keVByb3AoYm9keSwgJ25ld0l0ZW1QYXRoJyk7XG4gICAgICBjb25zdCBidWNrZXQgPSBhd2FpdCB0aGlzLmdldEJ1Y2tldChib2R5LmJ1Y2tldG5hbWUpO1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY29tbWFuZHMuUmVuYW1lRmlsZShcbiAgICAgICAgYnVja2V0LFxuICAgICAgICBib2R5Lml0ZW0sXG4gICAgICAgIGJvZHkubmV3SXRlbVBhdGgsXG4gICAgICAgIGNsYWltc1xuICAgICAgKTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlOiBDb3JlVHlwZXMuUmVzQm9keVJlbmFtZSA9IHtcbiAgICAgICAgcmVzdWx0OiByZXN1bHRcbiAgICAgIH07XG4gICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRocm93IG5ldyBWRXJyb3IoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIEhhbmRsZU1vdmUoXG4gICAgYm9keTogQ29yZVR5cGVzLlJlcUJvZHlNb3ZlLFxuICAgIGNsYWltczogQ29yZVR5cGVzLlVzZXJDdXN0b21DbGFpbXNcbiAgKTogUHJvbWlzZTxDb3JlVHlwZXMuUmVzQm9keU1vdmU+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgYnVja2V0ID0gYXdhaXQgdGhpcy5nZXRCdWNrZXQoYm9keS5idWNrZXRuYW1lKTtcbiAgICAgIGF3YWl0IENoZWNrSGFzQm9keVByb3AoYm9keSwgJ2l0ZW1zJyk7XG4gICAgICBhd2FpdCBDaGVja0hhc0JvZHlQcm9wKGJvZHksICduZXdQYXRoJyk7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBjb21tYW5kcy5Nb3ZlRmlsZXMoXG4gICAgICAgIGJ1Y2tldCxcbiAgICAgICAgYm9keS5pdGVtcyxcbiAgICAgICAgYm9keS5uZXdQYXRoLFxuICAgICAgICBjbGFpbXNcbiAgICAgICk7XG4gICAgICBjb25zdCByZXNwb25zZTogQ29yZVR5cGVzLlJlc0JvZHlNb3ZlID0ge1xuICAgICAgICByZXN1bHQ6IHJlc3VsdFxuICAgICAgfTtcbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgbmV3IFZFcnJvcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgSGFuZGxlQ29weShcbiAgICBib2R5OiBDb3JlVHlwZXMuUmVxQm9keUNvcHksXG4gICAgY2xhaW1zOiBDb3JlVHlwZXMuVXNlckN1c3RvbUNsYWltc1xuICApOiBQcm9taXNlPENvcmVUeXBlcy5SZXNCb2R5Q29weT4ge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBDaGVja0hhc0JvZHlQcm9wKGJvZHksICduZXdQYXRoJyk7XG4gICAgICBjb25zdCBidWNrZXQgPSBhd2FpdCB0aGlzLmdldEJ1Y2tldChib2R5LmJ1Y2tldG5hbWUpO1xuICAgICAgbGV0IGZpbGVzVG9Db3B5O1xuICAgICAgaWYgKGJvZHkuaXRlbXMpIHtcbiAgICAgICAgZmlsZXNUb0NvcHkgPSBib2R5Lml0ZW1zO1xuICAgICAgfSBlbHNlIGlmIChib2R5LnNpbmdsZUZpbGVOYW1lKSB7XG4gICAgICAgIGZpbGVzVG9Db3B5ID0gW2JvZHkuc2luZ2xlRmlsZU5hbWVdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdSZXF1ZXN0IGRvZXMgbm90IGNvbnRhaW4gZWl0aGVyIGJvZHkuaXRlbXMgb3IgYm9keS5zaW5nbGVGaWxlTmFtZSdcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNvbW1hbmRzLkNvcHlGaWxlcyhcbiAgICAgICAgYnVja2V0LFxuICAgICAgICBmaWxlc1RvQ29weSxcbiAgICAgICAgYm9keS5uZXdQYXRoLFxuICAgICAgICBjbGFpbXNcbiAgICAgICk7XG4gICAgICBjb25zdCByZXNwb25zZTogQ29yZVR5cGVzLlJlc0JvZHlDb3B5ID0ge1xuICAgICAgICByZXN1bHQ6IHJlc3VsdFxuICAgICAgfTtcbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgbmV3IFZFcnJvcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgSGFuZGxlUmVtb3ZlKFxuICAgIGJvZHk6IENvcmVUeXBlcy5SZXFCb2R5UmVtb3ZlLFxuICAgIGNsYWltczogQ29yZVR5cGVzLlVzZXJDdXN0b21DbGFpbXNcbiAgKTogUHJvbWlzZTxDb3JlVHlwZXMuUmVzQm9keVJlbW92ZT4ge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBDaGVja0hhc0JvZHlQcm9wKGJvZHksICdpdGVtcycpO1xuICAgICAgY29uc3QgYnVja2V0ID0gYXdhaXQgdGhpcy5nZXRCdWNrZXQoYm9keS5idWNrZXRuYW1lKTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNvbW1hbmRzLlJlbW92ZUZpbGVzKGJ1Y2tldCwgYm9keS5pdGVtcywgY2xhaW1zKTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlOiBDb3JlVHlwZXMuUmVzQm9keVJlbW92ZSA9IHtcbiAgICAgICAgcmVzdWx0OiByZXN1bHRcbiAgICAgIH07XG4gICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRocm93IG5ldyBWRXJyb3IoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIEhhbmRsZUVkaXQoXG4gICAgYm9keTogQ29yZVR5cGVzLlJlcUJvZHlFZGl0LFxuICAgIGNsYWltczogQ29yZVR5cGVzLlVzZXJDdXN0b21DbGFpbXNcbiAgKTogUHJvbWlzZTxDb3JlVHlwZXMuUmVzQm9keUVkaXQ+IHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgQ2hlY2tIYXNCb2R5UHJvcChib2R5LCAnaXRlbScpO1xuICAgICAgYXdhaXQgQ2hlY2tIYXNCb2R5UHJvcChib2R5LCAnY29udGVudCcpO1xuICAgICAgY29uc3QgYnVja2V0ID0gYXdhaXQgdGhpcy5nZXRCdWNrZXQoYm9keS5idWNrZXRuYW1lKTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNvbW1hbmRzLkVkaXRGaWxlKFxuICAgICAgICBidWNrZXQsXG4gICAgICAgIGJvZHkuaXRlbSxcbiAgICAgICAgYm9keS5jb250ZW50LFxuICAgICAgICBjbGFpbXNcbiAgICAgICk7XG4gICAgICBjb25zdCByZXNwb25zZTogQ29yZVR5cGVzLlJlc0JvZHlFZGl0ID0ge1xuICAgICAgICByZXN1bHQ6IHJlc3VsdFxuICAgICAgfTtcbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgbmV3IFZFcnJvcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgSGFuZGxlR2V0Q29udGVudChcbiAgICBib2R5OiBDb3JlVHlwZXMuUmVxQm9keUdldENvbnRlbnQsXG4gICAgY2xhaW1zOiBDb3JlVHlwZXMuVXNlckN1c3RvbUNsYWltc1xuICApOiBQcm9taXNlPENvcmVUeXBlcy5SZXNCb2R5R2V0Q29udGVudD4ge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBDaGVja0hhc0JvZHlQcm9wKGJvZHksICdpdGVtJyk7XG4gICAgICBjb25zdCBidWNrZXQgPSBhd2FpdCB0aGlzLmdldEJ1Y2tldChib2R5LmJ1Y2tldG5hbWUpO1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY29tbWFuZHMuR2V0RmlsZUNvbnRlbnQoYnVja2V0LCBib2R5Lml0ZW0sIGNsYWltcyk7XG4gICAgICBjb25zdCByZXNwb25zZTogQ29yZVR5cGVzLlJlc0JvZHlHZXRDb250ZW50ID0ge1xuICAgICAgICByZXN1bHQ6IHJlc3VsdFxuICAgICAgfTtcbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgbmV3IFZFcnJvcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgSGFuZGxlR2V0U2luZ2xlKFxuICAgIGJvZHk6IENvcmVUeXBlcy5SZXFCb2R5R2V0U2luZ2xlLFxuICAgIGNsYWltczogQ29yZVR5cGVzLlVzZXJDdXN0b21DbGFpbXNcbiAgKTogUHJvbWlzZTxDb3JlVHlwZXMuUmVzQm9keUdldFNpbmdsZT4ge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBDaGVja0hhc0JvZHlQcm9wKGJvZHksICdpdGVtJyk7XG4gICAgICBjb25zdCBidWNrZXQgPSBhd2FpdCB0aGlzLmdldEJ1Y2tldChib2R5LmJ1Y2tldG5hbWUpO1xuICAgICAgY29uc3QgZmlsZSA9IGF3YWl0IGNvbW1hbmRzLkdldFNpbmdsZShidWNrZXQsIGJvZHkuaXRlbSwgY2xhaW1zKTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlOiBDb3JlVHlwZXMuUmVzQm9keUdldFNpbmdsZSA9IHtcbiAgICAgICAgcmVzdWx0OiB7XG4gICAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgICBmaWxlOiBmaWxlLFxuICAgICAgICAgIHVybDogZmlsZS5kb3dubG9hZFVybFxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aHJvdyBuZXcgVkVycm9yKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBIYW5kbGVDcmVhdGVGb2xkZXIoXG4gICAgYm9keTogQ29yZVR5cGVzLlJlcUJvZHlDcmVhdGVGb2xkZXIsXG4gICAgY2xhaW1zOiBDb3JlVHlwZXMuVXNlckN1c3RvbUNsYWltc1xuICApOiBQcm9taXNlPENvcmVUeXBlcy5SZXNCb2R5Q3JlYXRlRm9sZGVyPiB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IENoZWNrSGFzQm9keVByb3AoYm9keSwgJ25ld1BhdGgnKTtcbiAgICAgIGNvbnN0IGJ1Y2tldCA9IGF3YWl0IHRoaXMuZ2V0QnVja2V0KGJvZHkuYnVja2V0bmFtZSk7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBjb21tYW5kcy5DcmVhdGVGb2xkZXIoXG4gICAgICAgIGJ1Y2tldCxcbiAgICAgICAgYm9keS5uZXdQYXRoLFxuICAgICAgICBjbGFpbXMsXG4gICAgICAgIGJvZHkuZGlzYWJsZU5vQ2xvYmJlcixcbiAgICAgICAgYm9keS5pc0FkbWluXG4gICAgICApO1xuICAgICAgY29uc3QgcmVzcG9uc2U6IENvcmVUeXBlcy5SZXNCb2R5Q3JlYXRlRm9sZGVyID0ge1xuICAgICAgICByZXN1bHQ6IHJlc3VsdFxuICAgICAgfTtcbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgbmV3IFZFcnJvcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgSGFuZGxlU2V0UGVybWlzc2lvbnMoXG4gICAgYm9keTogQ29yZVR5cGVzLlJlcUJvZHlTZXRQZXJtaXNzaW9ucyxcbiAgICBjbGFpbXM6IENvcmVUeXBlcy5Vc2VyQ3VzdG9tQ2xhaW1zXG4gICk6IFByb21pc2U8Q29yZVR5cGVzLlJlc0JvZHlTZXRQZXJtaXNzaW9ucz4ge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBDaGVja0hhc0JvZHlQcm9wKGJvZHksICdpdGVtcycpO1xuICAgICAgYXdhaXQgQ2hlY2tIYXNCb2R5UHJvcChib2R5LCAncm9sZScpO1xuICAgICAgYXdhaXQgQ2hlY2tIYXNCb2R5UHJvcChib2R5LCAnZW50aXR5Jyk7XG4gICAgICBjb25zdCBidWNrZXQgPSBhd2FpdCB0aGlzLmdldEJ1Y2tldChib2R5LmJ1Y2tldG5hbWUpO1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY29tbWFuZHMuQ2hhbmdlUGVybWlzc2lvbnMoXG4gICAgICAgIGJ1Y2tldCxcbiAgICAgICAgYm9keS5pdGVtcyxcbiAgICAgICAgYm9keS5yb2xlLFxuICAgICAgICBib2R5LmVudGl0eSxcbiAgICAgICAgYm9keS5yZWN1cnNpdmUsXG4gICAgICAgIGNsYWltc1xuICAgICAgKTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlOiBDb3JlVHlwZXMuUmVzQm9keVNldFBlcm1pc3Npb25zID0ge1xuICAgICAgICByZXN1bHQ6IHJlc3VsdFxuICAgICAgfTtcbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgbmV3IFZFcnJvcihlcnJvci5tZXNzYWdlKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBIYW5kbGVTZXRQZXJtaXNzaW9uc09iamVjdChcbiAgICBib2R5OiBDb3JlVHlwZXMuUmVxQm9keVNldFBlcm1pc3Npb25zT2JqZWN0LFxuICAgIGNsYWltczogQ29yZVR5cGVzLlVzZXJDdXN0b21DbGFpbXNcbiAgKTogUHJvbWlzZTxDb3JlVHlwZXMuUmVzQm9keVNldFBlcm1pc3Npb25zPiB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IENoZWNrSGFzQm9keVByb3AoYm9keSwgJ2l0ZW1zJyk7XG4gICAgICBhd2FpdCBDaGVja0hhc0JvZHlQcm9wKGJvZHksICdwZXJtaXNzaW9uc09iaicpO1xuICAgICAgY29uc3QgYnVja2V0ID0gYXdhaXQgdGhpcy5nZXRCdWNrZXQoYm9keS5idWNrZXRuYW1lKTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNvbW1hbmRzLkNoYW5nZVBlcm1pc3Npb25zT2JqZWN0KFxuICAgICAgICBidWNrZXQsXG4gICAgICAgIGJvZHkuaXRlbXMsXG4gICAgICAgIGJvZHkucGVybWlzc2lvbnNPYmosXG4gICAgICAgIGJvZHkucmVjdXJzaXZlLFxuICAgICAgICBjbGFpbXNcbiAgICAgICk7XG4gICAgICBjb25zdCByZXNwb25zZTogQ29yZVR5cGVzLlJlc0JvZHlTZXRQZXJtaXNzaW9ucyA9IHtcbiAgICAgICAgcmVzdWx0OiByZXN1bHRcbiAgICAgIH07XG4gICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRocm93IG5ldyBWRXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgSGFuZGxlU2F2ZUZpbGUoXG4gICAgYnVja2V0bmFtZTogc3RyaW5nLFxuICAgIGRpcmVjdG9yeVBhdGg6IHN0cmluZyxcbiAgICBvcmlnaW5hbG5hbWU6IHN0cmluZyxcbiAgICBtaW1ldHlwZTogc3RyaW5nLFxuICAgIGJ1ZmZlcjogQnVmZmVyLFxuICAgIGNsYWltczogQ29yZVR5cGVzLlVzZXJDdXN0b21DbGFpbXNcbiAgKTogUHJvbWlzZTxDb3JlVHlwZXMuUmVzQm9keVVwbG9hZEZpbGU+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgYnVja2V0ID0gYXdhaXQgdGhpcy5nZXRCdWNrZXQoYnVja2V0bmFtZSk7XG4gICAgICBhd2FpdCBjb21tYW5kcy5VcGxvYWRGaWxlKFxuICAgICAgICBidWNrZXQsXG4gICAgICAgIGRpcmVjdG9yeVBhdGgsXG4gICAgICAgIG9yaWdpbmFsbmFtZSxcbiAgICAgICAgbWltZXR5cGUsXG4gICAgICAgIGJ1ZmZlcixcbiAgICAgICAgY2xhaW1zXG4gICAgICApO1xuICAgICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgICByZXN1bHQ6IHtcbiAgICAgICAgICBzdWNjZXNzOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aHJvdyBuZXcgVkVycm9yKGVycm9yKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==