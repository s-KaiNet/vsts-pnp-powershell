import { Gulpclass, Task } from 'gulpclass';
import * as gulp from 'gulp';
const jeditor = require("gulp-json-editor");

@Gulpclass()
export class GulpFile {

    @Task('version')
    incrementVersion() {
        return gulp.src("./task.json")
            .pipe(jeditor((json: any) => {
                let major = json.version.Major;
                let minor = json.version.Minor;
                let patch = parseInt(json.version.Patch);
                json.version = {
                    "Major": major,
                    "Minor": minor,
                    "Patch": ++patch
                }
                return json; 
            }))
            .pipe(gulp.dest("./"));
    }
}