/** @jsx jsx */
import { jsx, Flex, Box, Text, useThemeUI } from 'theme-ui';
import { IoIosAddCircle, IoIosSwap } from 'react-icons/io';
import certificates from '~/config/tmpCerts';

function description(evt) {
  switch (evt.change) {
    case 'CREATED': {
      return `Created by ${evt.createdBy}`;
    }
    case 'TRANSFERRED': {
      return `Transferred from ${evt.from} to ${evt.to}`;
    }
    default: {
      return null;
    }
  }
}

export default function EventTimeline(props = {}) {
  const { certificateId } = props;
  const { theme } = useThemeUI();
  const certificate = certificates.find((c) => c.id === certificateId);
  return (
    <Flex
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          transform: 'translateX(50%)',
        }}
      >
        {certificate.events.slice().reverse().map((evt, idx) => (
          <Box
            sx={{
              position: 'relative',
            }}
          >
            {idx !== certificate.events.length - 1 && (
              <Box sx={{
                borderLeft: `2px solid ${theme.colors.text}`,
                position: 'absolute',
                height: 'calc(100% - 20px)',
                top: 20,
                left: 9,
              }} />
            )}
            <Flex
              sx={{
                pb: 20,
              }}
            >
              {evt.change === 'CREATED' && (
                <IoIosAddCircle size="20px" />        
              )}
              {evt.change === 'TRANSFERRED' && (
                <IoIosSwap size="20px" />
              )}
              <Text
                sx={{
                  px: 2,
                }}
              >
                {description(evt)}
              </Text>
            </Flex>
          </Box>
        ))}
      </Box>
    </Flex>
  );
}
