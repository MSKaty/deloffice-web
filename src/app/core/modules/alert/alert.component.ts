import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Alert, AlertType } from './alert.model';
import { AlertService } from '../../../common/services/alert.service';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PlatformService } from 'src/app/common/services/platform.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {
  private _notifier = new Subject<boolean>();

  @Input() id = 'default-alert';
  @Input() fade = true;

  alerts: Alert[] = [];

  constructor(
    private _alert: AlertService,
    private _plateform: PlatformService
  ) { }

  ngOnInit(): void {
    this._alert.onAlert(this.id)
      .pipe(
        // Memory leak prevention
        takeUntil(this._notifier)
      )
      .subscribe(alert => {
        // clear alerts when an empty alert is received
        if (!alert.message) {
          // filter out alerts without 'keepAfterRouteChange' flag
          this.alerts = this.alerts.filter(x => x.keepAfterRouteChange);

          // remove 'keepAfterRouteChange' flag on the rest
          this.alerts.forEach(x => delete x.keepAfterRouteChange);
          return;
        }

        // add alert to array
        this.alerts.push(alert);

        if (this._plateform.isBrowser) {
          const body = document.querySelector('body');
          body.classList.add('overflow-fixed');
          // body.classList.remove('overflow-fixed');
        }

        // auto close alert if required
        if (alert.autoClose) {
          setTimeout(() => this.removeAlert(alert), 10000);
        }
      });

  }

  ngOnDestroy() {
    // Memory leak prevention
    this._notifier.next(true);
  }

  removeAlert(alert: Alert) {
    // check if already removed to prevent error on auto close
    if (!this.alerts.includes(alert)) return;

    if (this.fade) {
      // fade out alert
      this.alerts.find(x => x === alert).fade = true;

      // remove alert after faded out
      setTimeout(() => {
        this.alerts = this.alerts.filter(x => x !== alert);
      }, 250);
    } else {
      // remove alert
      this.alerts = this.alerts.filter(x => x !== alert);
    }
  }

  cssClass(alert: Alert) {
    if (!alert) return;

    const classes = ['alert', 'alert-dismissable'];

    const alertTypeClass = {
      [AlertType.Success]: 'alert alert-success',
      [AlertType.Error]: 'alert alert-danger',
      [AlertType.Info]: 'alert alert-info',
      [AlertType.Warning]: 'alert alert-warning'
    }

    classes.push(alertTypeClass[alert.type]);

    if (alert.fade) {
      classes.push('fade');
    }

    return classes.join(' ');
  }

}