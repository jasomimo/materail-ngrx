import { Injectable } from '@angular/core';
import { GithubService } from 'src/app/services/github.service';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';

@Injectable()
export class UserEffect {
  constructor() {}
}
