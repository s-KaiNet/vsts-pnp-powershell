import { Gulpclass, Task } from 'gulpclass'
import * as gulp from 'gulp'
const jeditor = require('gulp-json-editor')
const shell = require('gulp-shell')

@Gulpclass()
export class GulpFile {

  @Task('upload-local')
    uploadLocal() {

    return gulp.src('package.json', { read: false })
            .pipe(shell(`tfx build tasks upload --task-path PnPPowerShell/PnPPowerShellV1/ --overwrite true --service-url https://dev.azure.com/Mastaq --token ${process.env.VSTS_TOKEN}`, {
              cwd: '../../',
              verbose: true
            }))
  }

  @Task('version')
    incrementVersion() {
    return gulp.src('./task.json')
            .pipe(jeditor((json: any) => {
              let major = json.version.Major
              let minor = json.version.Minor
              let patch = parseInt(json.version.Patch)
              json.version = {
                'Major': major,
                'Minor': minor,
                'Patch': ++patch
              }
              return json
            }))
            .pipe(gulp.dest('./'))
  }
}
