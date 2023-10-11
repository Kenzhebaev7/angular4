import { Component } from '@angular/core';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "todo";

  filter: "all" | "active" | "done" = "all";

  allItems = [
    { description: "eat", done: true },
    { description: "sleep", done: false },
    { description: "play", done: false },
    { description: "laugh", done: false },
  ];

  get items() {
    if (this.filter === "all") {
      return this.allItems;
    }
    return this.allItems.filter((item) =>
      this.filter === "done" ? item.done : !item.done
    );
  }
  addItem(description: string) {
  this.allItems.unshift({
    description,
    done: false
  });
}
deleteItem(itemToDelete: any) {
    const index = this.allItems.indexOf(itemToDelete);
    if (index !== -1) {
      this.allItems.splice(index, 1);
    }
  }

buttonText = 'Hello World';
  clickCount = 0;
  changeButtonText() {
   if (this.clickCount === 0) {
      this.buttonText = 'Сәлем Әлем';
    } else if (this.clickCount === 1) {
      this.buttonText = 'Привет мир';
    } else if (this.clickCount === 2) {
      this.buttonText = 'Ciao mondo';
    }

    this.clickCount++;
   if (this.clickCount === 3) {
      this.clickCount = 0;
    }
  }

}


