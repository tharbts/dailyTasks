import { Component, OnInit, ViewChild } from '@angular/core';
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
    filter: Filter;

    constructor(private dailyTaksService: DailyTasksService) { }

    ngOnInit(): void {
        this.loadFilter();
        this.loadDailyTasks();
    }

    private loadFilter() {
        var date = new Date();
        this.filter = {
            InitialDate: new Date(date.getFullYear(), date.getMonth(), 1),
            FinalDate: date
        }
    }

    public loadDailyTasks(filter?: Filter) {
        this.dailyTaksService.Get(this.filter).subscribe(dt => {
            this.dailyTasks = dt;
        });
    }

}
