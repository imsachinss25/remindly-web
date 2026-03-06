import React from "react";
import Skeleton from "../../common/Skeleton";
import styles from "./ListSkeleton.module.css";

const ListSkeleton = React.memo(() => {

  return (
    <div className={styles.skeletonWrapper}>
      {[1, 2, 3, 4, 5].map(item => {
        return (
          <div key={`reminde-list-skeleton-${item}`}>
            <Skeleton />
          </div>
        )
      })}
    </div>
  )
})

export default ListSkeleton