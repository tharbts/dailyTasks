import { DailyTasksService } from './../../Services/daily-tasks.service';
import { Component, OnInit } from '@angular/core';
import { DailyTasks } from 'src/app/Models/DailyTasks';
import { Task } from 'src/app/Models/Task';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    value;
    dailyTasks:DailyTasks = new DailyTasks();

    constructor(private dailyTaksService: DailyTasksService, private titleService: Title) {
        this.loadDailyTasks();
        this.setTitle();
    }

    ngOnInit(): void {
    }

    public setTitle() {
        this.titleService.setTitle('DailyTasks - Inclusão de atividades');
    }

    changeDate(date:Date) {
        this.loadDailyTasks(date);
    }

    public add() {

        if (this.value == '' || this.value == undefined)
            return false;

        var task: Task = {
            id: 0,
            description: this.value,
            done: true
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

    private loadDailyTasks(date?: Date) {

        var filter = this.fillFilter(date);

        this.dailyTaksService.Get(filter).subscribe(dt => {
            if (dt.length){
                this.dailyTasks = dt[0];
                this.dailyTasks.date = new Date(this.dailyTasks.date);
            }else{
                this.dailyTasks = new DailyTasks();
                this.dailyTasks.date = filter.InitialDate;
            }
        });

    }

    private fillFilter(date? : Date){
        var referenceDate = new Date();
        var ssDate = sessionStorage.getItem('dt-ref-date');

        if(date)
            referenceDate = date;
        else if(ssDate)
            referenceDate = new Date(ssDate);

        sessionStorage.setItem('dt-ref-date', referenceDate.toLocaleDateString());
        return {
            InitialDate : referenceDate,
            FinalDate : referenceDate
        }
    }

}
