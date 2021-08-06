import React, { PureComponent } from 'react';
import { PullToRefresh as Resfresh } from 'react-js-pull-to-refresh';

import { PullDownContent, ReleaseContent, RefreshContent } from '../';

class PullToRefresh extends PureComponent {
  render() {
    const { children, onRefresh } = this.props;
    return (
      <Resfresh
        pullDownContent={<PullDownContent />}
        releaseContent={<ReleaseContent />}
        refreshContent={<RefreshContent />}
        pullDownThreshold={100}
        onRefresh={onRefresh}
        triggerHeight={100}
        startInvisible={true}
      >
        {children}
      </Resfresh>
    );
  }
}

export default PullToRefresh;
