import { Task } from './Task';

export class DailyTasks{
    id: number = 0;
    date: Date = new Date();
    tasks: Task[] = [];
}