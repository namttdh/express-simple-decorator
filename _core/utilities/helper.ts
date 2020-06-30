export function autoImportFolder(path: string): void {
    require("fs").readdirSync(path).forEach(function(file:string) {
        require(path + '/' + file);
    });
}