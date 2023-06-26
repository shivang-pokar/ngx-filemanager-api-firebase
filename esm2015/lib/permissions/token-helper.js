import { __awaiter } from "tslib";
import * as jwt from 'jsonwebtoken';
export function GetTokenFromRequest(req) {
    return __awaiter(this, void 0, void 0, function* () {
        let idToken;
        const isInHeader = req.headers['authorization'];
        const hasCookie = req['cookies'];
        if (isInHeader) {
            // Read the ID Token from the Authorization header.
            idToken = req.headers['authorization'];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW4taGVscGVyLmpzIiwic291cmNlUm9vdCI6Ii9Wb2x1bWVzL1NoaXZhbmcvUGkgU29mdHdhcmUvZmlsZS1tYW5hZ2VyL25neC1maWxlbWFuYWdlci9wcm9qZWN0cy9uZ3gtZmlsZW1hbmFnZXItYXBpLWZpcmViYXNlL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9wZXJtaXNzaW9ucy90b2tlbi1oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sS0FBSyxHQUFHLE1BQU0sY0FBYyxDQUFDO0FBR3BDLE1BQU0sVUFBZ0IsbUJBQW1CLENBQUMsR0FBWTs7UUFDcEQsSUFBSSxPQUFPLENBQUM7UUFDWixNQUFNLFVBQVUsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ2hELE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVqQyxJQUFJLFVBQVUsRUFBRTtZQUNkLG1EQUFtRDtZQUNuRCxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztTQUN4QzthQUFNLElBQUksU0FBUyxFQUFFO1lBQ3BCLGlDQUFpQztZQUNqQyxPQUFPLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztTQUNwQzthQUFNO1lBQ0wsTUFBTSxJQUFJLEtBQUssQ0FDYiw4REFBOEQsQ0FDL0QsQ0FBQztTQUNIO1FBRUQsTUFBTSxZQUFZLEdBQUcsTUFBTSxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUMsT0FBTyxZQUEwQyxDQUFDO0lBQ3BELENBQUM7Q0FBQTtBQUVELE1BQU0sVUFBZ0IsU0FBUyxDQUFDLE1BQWM7O1FBQzVDLElBQUk7WUFDRixNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ25ELE9BQU8sT0FBTyxDQUFDO1NBQ2hCO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxNQUFNLElBQUksS0FBSyxDQUFDLG9CQUFvQixHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN2RDtJQUNILENBQUM7Q0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGp3dCBmcm9tICdqc29ud2VidG9rZW4nO1xuaW1wb3J0IHsgQ29yZVR5cGVzIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR2V0VG9rZW5Gcm9tUmVxdWVzdChyZXE6IFJlcXVlc3QpIHtcbiAgbGV0IGlkVG9rZW47XG4gIGNvbnN0IGlzSW5IZWFkZXIgPSByZXEuaGVhZGVyc1snYXV0aG9yaXphdGlvbiddO1xuICBjb25zdCBoYXNDb29raWUgPSByZXFbJ2Nvb2tpZXMnXTtcblxuICBpZiAoaXNJbkhlYWRlcikge1xuICAgIC8vIFJlYWQgdGhlIElEIFRva2VuIGZyb20gdGhlIEF1dGhvcml6YXRpb24gaGVhZGVyLlxuICAgIGlkVG9rZW4gPSByZXEuaGVhZGVyc1snYXV0aG9yaXphdGlvbiddO1xuICB9IGVsc2UgaWYgKGhhc0Nvb2tpZSkge1xuICAgIC8vIFJlYWQgdGhlIElEIFRva2VuIGZyb20gY29va2llLlxuICAgIGlkVG9rZW4gPSByZXFbJ2Nvb2tpZXMnXS5fX3Nlc3Npb247XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ1JlcXVlc3QgSGVhZGVyIGRvZXNuXFwndCBjb250YWluIGEgdmFsaWQgYXV0aG9yaXphdGlvbiBiZWFyZXInXG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0IGRlY29kZWRUb2tlbiA9IGF3YWl0IERlY29kZUpXVChpZFRva2VuKTtcbiAgcmV0dXJuIGRlY29kZWRUb2tlbiBhcyBDb3JlVHlwZXMuVXNlckN1c3RvbUNsYWltcztcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIERlY29kZUpXVChiZWFyZXI6IHN0cmluZyk6IFByb21pc2U8e30+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBkZWNvZGVkID0gand0LmRlY29kZShiZWFyZXIsIHsganNvbjogdHJ1ZSB9KTtcbiAgICByZXR1cm4gZGVjb2RlZDtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0Vycm9yIGRlY29kaW5nIEpXVCcgKyBlcnJvci5tZXNzYWdlKTtcbiAgfVxufVxuIl19