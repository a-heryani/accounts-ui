import { Component } from 'react'

import styles from './Meta.less'

const formatDate = date => {
  if (!date) {
    return ''
  }
  const newDate = new Date(date)
  return `${newDate.getMonth() +
    1}-${newDate.getDate()}-${newDate.getFullYear()}`
}
export default class Meta extends Component {
  render() {
    return (
      <Card>
        <CardHeader>
          <h2>
            <i className="fa fa-info-circle" aria-hidden="true" />
            &nbsp;Metadata
          </h2>
        </CardHeader>
        <CardContent>
          <div className={styles.Meta}>
            <header>
              <h3>Zuid</h3>
              <h3>Created</h3>
              <h3>Updated</h3>
              <h3>Hash Id</h3>
            </header>
            <main>
              <h5>{this.props.site.ZUID}</h5>
              <h5>{formatDate(this.props.site.createdAt)}</h5>
              <h5>{formatDate(this.props.site.updatedAt)}</h5>
              <h5>{this.props.site.randomHashID}</h5>
            </main>
          </div>
        </CardContent>
      </Card>
    )
  }
}