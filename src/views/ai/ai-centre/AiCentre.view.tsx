// import SuggestionsBusinesses from '#/views/ai/ai-centre/components/AiBusinesses.view';
import SuggestionsOffenders from '#/views/ai/ai-centre/components/AiOffenders/AiOffenders.view';
import SuggestionsStats from '#/views/ai/ai-centre/components/AiStats.view';
import AiSuggestions from '#/views/ai/ai-centre/components/AiSuggestions/AiSuggestions.view';
import SuggestionsTrends from '#/views/ai/ai-centre/components/AiTrends/AiTrends.view';
import { Col, Row } from 'antd';
import React from 'react';

const SuggestionsDashboard = () => (
  <div style={{ padding: 20 }}>
    <Row gutter={32}>
      <Col
        span={12}
        style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        <SuggestionsStats />
        <SuggestionsTrends />
        <SuggestionsOffenders />
        {/* <SuggestionsBusinesses />*/}
      </Col>

      <Col span={12}>
        <AiSuggestions />
      </Col>
    </Row>
  </div>
);

export default SuggestionsDashboard;
