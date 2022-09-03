import React, { useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import SchellarItem from './SchellarItem'
import { AddButton, CardTitle, IconCard, LoadingFakeText, Pagination } from '@bit/totalsoft_oss.react-mui.kit.core'
import NotificationsIcon from '@material-ui/icons/Notifications'
import { Table, Thead, Tbody, Tr, Th } from 'react-super-responsive-table'
import { Grid, makeStyles } from '@material-ui/core'
import { defaults } from 'apollo/defaultCacheData'
import { eventHandlersPager } from 'apollo/cacheKeyFunctions'
import styles from '../styles'

const defaultPager = defaults[eventHandlersPager]
const useStyles = makeStyles(styles)

const SchellarList = ({ pager, setPager, onRefresh, onDelete, onEdit, onAdd, list, loading }) => {
  const { t } = useTranslation()
  const classes = useStyles()

  const { page, pageSize, totalCount } = pager
  const currentPageHandlers = list.slice(page * pageSize, (page + 1) * pageSize)

  const handleRowsPerPageChange = useCallback(newPageSize => setPager({ ...defaultPager, pageSize: parseInt(newPageSize, 10) }), [setPager])
  const handlePageChange = useCallback(
    newPage => {
      setPager(currentPager => ({ ...currentPager, page: newPage }))
    },
    [setPager]
  )

  useEffect(() => {
    if (list && totalCount !== list.length) setPager(currentPager => ({ ...currentPager, totalCount: list?.length }))
  }, [totalCount, setPager, list])

  return (
    <IconCard
      icon={NotificationsIcon}
      title={
        <CardTitle
          title={t('Schedule.ScheduleList')}
          actions={[<AddButton key='addButton' color={'theme'} title={t('Schedule.Buttons.Add')} onClick={onAdd} />]}
        />
      }
      content={
        loading ? (
          <LoadingFakeText lines={10} />
        ) : (
          <>
            <Grid className={classes.enableScrollX}>
              <Table className={classes.table}>
                <Thead>
                  <Tr>
                    <Th className={classes.tableHeader}>{t('Schedule.Enabled')}</Th>
                    <Th className={classes.tableHeader}>{t('Schedule.Name')}</Th>
                    <Th className={classes.tableHeader}>{t('Schedule.Workflow')}</Th>
                    <Th className={classes.tableHeader}>{t('Schedule.Cron')}</Th>
                    <Th className={classes.tableHeader}>{t('Schedule.ParallelRuns')}</Th>
                    <Th className={classes.tableHeader}>{t('Schedule.WorkflowContext')}</Th>
                    <Th className={classes.tableHeader} />
                  </Tr>
                </Thead>
                <Tbody>
                  {currentPageHandlers?.map((schedule, index) => (
                    <SchellarItem key={index} schedule={schedule} onDelete={onDelete} onEdit={onEdit} />
                  ))}
                </Tbody>
              </Table>
            </Grid>
            <Pagination
              totalCount={totalCount}
              pageSize={pageSize}
              page={page}
              onRowsPerPageChange={handleRowsPerPageChange}
              onPageChange={handlePageChange}
              onRefresh={onRefresh}
            />
          </>
        )
      }
    />
  )
}

SchellarList.propTypes = {
  list: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  pager: PropTypes.object.isRequired,
  setPager: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired
}

export default SchellarList
