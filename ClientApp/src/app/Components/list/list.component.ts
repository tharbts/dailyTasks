import { Component, OnInit } from '@angular/core';
import { DailyTasks } from 'src/app/Models/DailyTasks';
import { Filter } from 'src/app/Models/Filter';
import { DailyTasksService } from 'src/app/Services/daily-tasks.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

    dailyTasks: DailyTasks[] = [];

    constructor(private dailyTaksService: DailyTasksService) { }

    ngOnInit(): void {
        this.loadDailyTasks();
    }

    private loadDailyTasks(filter?: Filter) {

        if (filter == null) {
            var date = new Date();
            var filter: Filter = {
                InitialDate: new Date(date.getFullYear(), date.getMonth(), 1),
                FinalDate: date
            }
        }

        this.dailyTaksService.Get(filter).subscribe(dt => {
            if (dt.length) {
                this.dailyTasks = dt;
            }
        });

    }

}
