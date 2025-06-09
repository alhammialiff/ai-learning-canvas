import { ChangeDetectionStrategy, Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent {

  @Input() dataset: any[] = [];

  attributes: any[] | null = null;

  // Use ngOnChange lifecycle to trigger change detection in dataset change
  ngOnChanges(changes: SimpleChanges) {

    if (changes['dataset'] && this.dataset && this.dataset.length > 0) {

      this.attributes = Object.keys(this.dataset[0]);

    } else {

      this.attributes = [];

    }

  }

}
