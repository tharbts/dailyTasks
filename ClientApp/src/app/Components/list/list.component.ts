import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
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
    filter: Filter = new Filter();

    constructor(private dailyTaksService: DailyTasksService, private titleService: Title) { }

    ngOnInit(): void {
        this.loadFilter();
        this.loadDailyTasks();
        this.setTitle();
    }

    public setTitle() {
        this.titleService.setTitle(`Relatório ${this.filter.InitialDate.toLocaleDateString('pt-br')} -  ${this.filter.FinalDate.toLocaleDateString('pt-br')}`);
    }

    private loadFilter() {
        var ssInitialDate = sessionStorage.getItem('dt-initial-date');
        var ssFinalDate = sessionStorage.getItem('dt-final-date');

        this.filter.InitialDate = ssInitialDate ? new Date(ssInitialDate) : new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        this.filter.FinalDate = ssFinalDate ? new Date(ssFinalDate) : new Date();
    }

    public loadDailyTasks() {
        this.dailyTaksService.Get(this.filter).subscribe(dt => {
            this.dailyTasks = dt;
        });
        this.registerFilter();
    }

    private registerFilter() {
        sessionStorage.setItem('dt-initial-date', this.filter.InitialDate.toLocaleDateString());
        sessionStorage.setItem('dt-final-date', this.filter.FinalDate.toLocaleDateString());
    }

}
