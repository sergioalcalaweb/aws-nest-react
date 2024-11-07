import { Directive } from '@angular/core';
import { inject, input, computed } from '@angular/core';
import { CurrentTransitionService } from '../service/current-transition/current-transition-service.service';

@Directive({
  selector: '[appViewTransition]',
  standalone: true,
  host: { '[style.view-transition-name]': 'viewTransitionName()' },
})
export class ViewTransitionDirective {
  private readonly viewTranistionService = inject(CurrentTransitionService);

  readonly name = input.required<string>({
    alias: 'appViewTransition',
  });
  readonly id = input.required<number>();

  protected readonly viewTransitionName = computed(() => {
    const currentTransition = this.viewTranistionService.currentTransition();

    const apply =
      Number(currentTransition?.to.firstChild?.params['id']) === this.id() ||
      Number(currentTransition?.from.firstChild?.params['id']) === this.id();
    return apply ? this.name() : '';
  });
}
