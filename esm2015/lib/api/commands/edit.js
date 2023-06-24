import { __awaiter } from "tslib";
export function EditFile(bucket, item, content, claims) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = { success: true };
        try {
            yield bucket.file(item).save(content);
        }
        catch (error) {
            result.success = false;
        }
        return result;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC5qcyIsInNvdXJjZVJvb3QiOiIvVm9sdW1lcy9TaGl2YW5nL1BpIFNvZnR3YXJlL2ZpbGUtbWFuYWdlci9uZ3gtZmlsZW1hbmFnZXIvcHJvamVjdHMvbmd4LWZpbGVtYW5hZ2VyLWFwaS1maXJlYmFzZS9zcmMvIiwic291cmNlcyI6WyJsaWIvYXBpL2NvbW1hbmRzL2VkaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUdBLE1BQU0sVUFBZ0IsUUFBUSxDQUM1QixNQUFjLEVBQ2QsSUFBWSxFQUNaLE9BQWUsRUFDZixNQUFrQzs7UUFFbEMsTUFBTSxNQUFNLEdBQUcsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDakMsSUFBSTtZQUNGLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDdkM7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE1BQU0sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1NBQ3hCO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQnVja2V0IH0gZnJvbSAnLi4vLi4vdHlwZXMvZ29vZ2xlLWNsb3VkLXR5cGVzJztcbmltcG9ydCB7IENvcmVUeXBlcyB9IGZyb20gJy4uLy4uL3R5cGVzJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEVkaXRGaWxlKFxuICBidWNrZXQ6IEJ1Y2tldCxcbiAgaXRlbTogc3RyaW5nLFxuICBjb250ZW50OiBzdHJpbmcsXG4gIGNsYWltczogQ29yZVR5cGVzLlVzZXJDdXN0b21DbGFpbXNcbikge1xuICBjb25zdCByZXN1bHQgPSB7IHN1Y2Nlc3M6IHRydWUgfTtcbiAgdHJ5IHtcbiAgICBhd2FpdCBidWNrZXQuZmlsZShpdGVtKS5zYXZlKGNvbnRlbnQpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJlc3VsdC5zdWNjZXNzID0gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbiJdfQ==