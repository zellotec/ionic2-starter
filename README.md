# DummyModule

Change this description.

[How to publish a package?](https://github.com/mbamobi/ionic2-starter/blob/npm-module/.github/PUBLISHING.md)

## Using  in an Ionic 2 app

```typescript
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

// import ConfigurationModule
import { DummyModule } from '@mbamobi/dummy';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    DummyModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ]
})
export class AppModule {}
```

Contributing

See [CONTRIBUTING.md](https://github.com/mbamobi/ionic2-starter/blob/npm-module/.github/CONTRIBUTING.md)
