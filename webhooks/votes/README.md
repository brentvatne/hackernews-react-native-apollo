Deploy this to now.sh or wherever you like, then create a SSS function on Graphcool and plop the following in the subscription query side and the url for this deployed app in the webhook url field.

```graphql
subscription {
  Vote(filter: {
    mutation_in: [CREATED]
  }) {
    updatedFields
    node {
      id
      link {
        id
        score
        _votesMeta {
          count
        }
      }
    }
  }
}
```


