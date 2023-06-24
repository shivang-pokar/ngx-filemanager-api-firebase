import { __awaiter } from "tslib";
import * as jwt from 'jsonwebtoken';
export function GetTokenFromRequest(req) {
    return __awaiter(this, void 0, void 0, function* () {
        let idToken;
        const isInHeader = req.headers['authorization'] &&
            req.headers['authorization'].startsWith('Bearer ');
        const hasCookie = req['cookies'];
        if (isInHeader) {
            // Read the ID Token from the Authorization header.
            idToken = req.headers['authorization'].split('Bearer ')[1];
        }
        else if (hasCookie) {
            // Read the ID Token from cookie.
            idToken = req['cookies'].__session;
        }
        else {
            throw new Error('Request Header doesn\'t contain a valid authorization bearer');
        }
        const decodedToken = yield DecodeJWT(idToken);
        return decodedToken;
    });
}
export function DecodeJWT(bearer) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const decoded = jwt.decode(bearer, { json: true });
            return decoded;
        }
        catch (error) {
            throw new Error('Error decoding JWT' + error.message);
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW4taGVscGVyLmpzIiwic291cmNlUm9vdCI6Ii9Wb2x1bWVzL1NoaXZhbmcvUGkgU29mdHdhcmUvZmlsZS1tYW5hZ2VyL25neC1maWxlbWFuYWdlci9wcm9qZWN0cy9uZ3gtZmlsZW1hbmFnZXItYXBpLWZpcmViYXNlL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9wZXJtaXNzaW9ucy90b2tlbi1oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sS0FBSyxHQUFHLE1BQU0sY0FBYyxDQUFDO0FBR3BDLE1BQU0sVUFBZ0IsbUJBQW1CLENBQUMsR0FBWTs7UUFDcEQsSUFBSSxPQUFPLENBQUM7UUFDWixNQUFNLFVBQVUsR0FDZCxHQUFHLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQztZQUM1QixHQUFHLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyRCxNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFakMsSUFBSSxVQUFVLEVBQUU7WUFDZCxtREFBbUQ7WUFDbkQsT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzVEO2FBQU0sSUFBSSxTQUFTLEVBQUU7WUFDcEIsaUNBQWlDO1lBQ2pDLE9BQU8sR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxDQUFDO1NBQ3BDO2FBQU07WUFDTCxNQUFNLElBQUksS0FBSyxDQUNiLDhEQUE4RCxDQUMvRCxDQUFDO1NBQ0g7UUFFRCxNQUFNLFlBQVksR0FBRyxNQUFNLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5QyxPQUFPLFlBQTBDLENBQUM7SUFDcEQsQ0FBQztDQUFBO0FBRUQsTUFBTSxVQUFnQixTQUFTLENBQUMsTUFBYzs7UUFDNUMsSUFBSTtZQUNGLE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDbkQsT0FBTyxPQUFPLENBQUM7U0FDaEI7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE1BQU0sSUFBSSxLQUFLLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3ZEO0lBQ0gsQ0FBQztDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgand0IGZyb20gJ2pzb253ZWJ0b2tlbic7XG5pbXBvcnQgeyBDb3JlVHlwZXMgfSBmcm9tICcuLi90eXBlcyc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHZXRUb2tlbkZyb21SZXF1ZXN0KHJlcTogUmVxdWVzdCkge1xuICBsZXQgaWRUb2tlbjtcbiAgY29uc3QgaXNJbkhlYWRlciA9XG4gICAgcmVxLmhlYWRlcnNbJ2F1dGhvcml6YXRpb24nXSAmJlxuICAgIHJlcS5oZWFkZXJzWydhdXRob3JpemF0aW9uJ10uc3RhcnRzV2l0aCgnQmVhcmVyICcpO1xuICBjb25zdCBoYXNDb29raWUgPSByZXFbJ2Nvb2tpZXMnXTtcblxuICBpZiAoaXNJbkhlYWRlcikge1xuICAgIC8vIFJlYWQgdGhlIElEIFRva2VuIGZyb20gdGhlIEF1dGhvcml6YXRpb24gaGVhZGVyLlxuICAgIGlkVG9rZW4gPSByZXEuaGVhZGVyc1snYXV0aG9yaXphdGlvbiddLnNwbGl0KCdCZWFyZXIgJylbMV07XG4gIH0gZWxzZSBpZiAoaGFzQ29va2llKSB7XG4gICAgLy8gUmVhZCB0aGUgSUQgVG9rZW4gZnJvbSBjb29raWUuXG4gICAgaWRUb2tlbiA9IHJlcVsnY29va2llcyddLl9fc2Vzc2lvbjtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnUmVxdWVzdCBIZWFkZXIgZG9lc25cXCd0IGNvbnRhaW4gYSB2YWxpZCBhdXRob3JpemF0aW9uIGJlYXJlcidcbiAgICApO1xuICB9XG5cbiAgY29uc3QgZGVjb2RlZFRva2VuID0gYXdhaXQgRGVjb2RlSldUKGlkVG9rZW4pO1xuICByZXR1cm4gZGVjb2RlZFRva2VuIGFzIENvcmVUeXBlcy5Vc2VyQ3VzdG9tQ2xhaW1zO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gRGVjb2RlSldUKGJlYXJlcjogc3RyaW5nKTogUHJvbWlzZTx7fT4ge1xuICB0cnkge1xuICAgIGNvbnN0IGRlY29kZWQgPSBqd3QuZGVjb2RlKGJlYXJlciwgeyBqc29uOiB0cnVlIH0pO1xuICAgIHJldHVybiBkZWNvZGVkO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHRocm93IG5ldyBFcnJvcignRXJyb3IgZGVjb2RpbmcgSldUJyArIGVycm9yLm1lc3NhZ2UpO1xuICB9XG59XG4iXX0=