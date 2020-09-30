import { Filter } from './../../Models/Filter';
import { DailyTasksService } from './../../Services/daily-tasks.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DailyTasks } from 'src/app/Models/DailyTasks';
import { Task } from 'src/app/Models/Task';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    value;
    dailyTasks = new DailyTasks();
    displayedColumns = ['description', 'status', 'remove'];

    constructor(private dailyTaksService: DailyTasksService) {
        this.loadDailyTasks();
    }

    ngOnInit(): void {
    }

    changeDate(date) {
        var filter: Filter = {
            FinalDate: date,
            InitialDate: date
        };

        this.loadDailyTasks(filter);
    }

    public add() {

        if (this.value == '' || this.value == undefined)
            return false;

        var task: Task = {
            id: 0,
            description: this.value,
            done: false
        };

        this.dailyTasks.tasks.push(task);
        this.save();
        this.value = "";
    }

    public delete(id: number) {
        this.dailyTasks.tasks = this.dailyTasks.tasks.filter(t => t.id != id);
        this.save();
    }

    public check(id: number) {
        var i = this.dailyTasks.tasks.findIndex(x => x.id == id);
        this.dailyTasks.tasks[i].done = !this.dailyTasks.tasks[i].done;
        this.save();
    }

    private save() {

        if (this.dailyTasks.id == 0) {
            this.dailyTaksService.create(this.dailyTasks).subscribe(dt => {
                this.dailyTasks = dt;
            });
        } else {
            this.dailyTaksService.update(this.dailyTasks).subscribe(dt => {
                this.dailyTasks = dt;
            });
        }
    }

    private loadDailyTasks(filter?: Filter) {

        if (filter == null) {
            var filter: Filter = {
                InitialDate : new Date(),
                FinalDate : new Date()
            }
        }

        this.dailyTaksService.Get(filter).subscribe(dt => {
            if (dt.length)
                this.dailyTasks = dt[0];
            else
                this.dailyTasks = new DailyTasks();
                this.dailyTasks.date = filter.InitialDate;
        });
    }

}
