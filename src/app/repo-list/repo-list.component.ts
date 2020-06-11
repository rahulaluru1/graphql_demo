import { Component, OnInit } from '@angular/core';

import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';
import { Repo, Query } from '../types';

@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.css']
})
export class RepoListComponent implements OnInit {
  repos: Observable<Repo[]>;

  nameClick(temp){

    document.getElementById("contributors").innerHTML=" ";
    console.log(temp);
    document.getElementById("contributors").innerHTML+="<ul>";
    var names=temp.split(',')
    names.forEach(name => {
      console.log(name);
        if(name!=null)
        document.getElementById("contributors").innerHTML+="<li>"+name+" "+"</li>";
    });
    document.getElementById("contributors").innerHTML+="</ul>";
  }

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.repos = this.apollo.watchQuery<Query>({
      query: gql`
      query {
        repos{
            title
            author
            description
            topic
            url
        }
    }
      `
    })
      .valueChanges
      .pipe(
        map(result => result.data.repos)
      );
  }
  }