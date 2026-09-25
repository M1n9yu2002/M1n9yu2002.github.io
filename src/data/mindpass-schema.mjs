// Parsed from the user-supplied MindPass SQL schema. The SQL, not the illustration, defines columns and foreign keys.
export const mindpassSchema = {
  "therapists": {
    "columns": {
      "id": "uuid",
      "wallet_address": "text",
      "full_name": "text",
      "work_email": "text",
      "specialty": "text",
      "bio": "text",
      "languages": "ARRAY",
      "ekyc_status": "text",
      "sbt_minted": "boolean",
      "is_online": "boolean",
      "rating": "numeric",
      "total_sessions": "integer",
      "total_earned_eth": "numeric",
      "created_at": "timestamp with time zone",
      "supported_modes": "ARRAY",
      "legal_name": "text",
      "resume_url": "text",
      "license_url": "text",
      "id_card_url": "text",
      "sbt_status": "text",
      "ekyc_score": "double precision",
      "clinical_specialty": "text",
      "selfie_url": "text",
      "no_show_flag_count": "integer",
      "mutual_unstarted_flag_count": "integer"
    },
    "primaryKey": "id",
    "foreignKeys": []
  },
  "patients": {
    "columns": {
      "id": "uuid",
      "wallet_address": "text",
      "total_deposits": "numeric",
      "created_at": "timestamp with time zone",
      "support_code": "text",
      "subsidy_balance": "numeric"
    },
    "primaryKey": "id",
    "foreignKeys": []
  },
  "redeem_codes": {
    "columns": {
      "id": "uuid",
      "code": "text",
      "eth_value": "numeric",
      "is_used": "boolean",
      "used_by_wallet": "text",
      "used_at": "timestamp with time zone"
    },
    "primaryKey": "id",
    "foreignKeys": []
  },
  "sessions": {
    "columns": {
      "id": "uuid",
      "patient_wallet": "text",
      "therapist_wallet": "text",
      "status": "text",
      "escrow_amount": "numeric",
      "created_at": "timestamp with time zone",
      "updated_at": "timestamp with time zone",
      "amount_eth": "double precision",
      "session_mode": "text",
      "session_fee_eth": "numeric",
      "funding_source": "text",
      "subsidy_applied_eth": "numeric",
      "wallet_required_eth": "numeric",
      "wallet_funded_eth": "numeric",
      "protocol_fee_eth": "numeric",
      "therapist_payout_eth": "numeric",
      "scheduled_start_at": "timestamp with time zone",
      "scheduled_end_at": "timestamp with time zone",
      "therapist_responded_at": "timestamp with time zone",
      "patient_confirmed_at": "timestamp with time zone",
      "patient_cancelled_at": "timestamp with time zone",
      "rejection_reason": "text",
      "patient_subsidy_choice_eth": "numeric",
      "patient_wallet_choice_eth": "numeric",
      "ack_penalty_policy": "boolean",
      "ack_illegal_policy": "boolean",
      "ack_single_active_booking": "boolean",
      "provider_accepted_at": "timestamp with time zone",
      "payment_due_at": "timestamp with time zone",
      "patient_paid_at": "timestamp with time zone",
      "funded_at": "timestamp with time zone",
      "patient_joined_at": "timestamp with time zone",
      "therapist_joined_at": "timestamp with time zone",
      "session_started_at": "timestamp with time zone",
      "completed_at": "timestamp with time zone",
      "rejected_at": "timestamp with time zone",
      "payment_timeout_at": "timestamp with time zone",
      "no_show_deadline_at": "timestamp with time zone",
      "penalty_fee_eth": "numeric",
      "refund_amount_eth": "numeric",
      "settlement_status": "text",
      "onchain_session_id": "bigint",
      "contract_address": "text",
      "chain_id": "bigint",
      "booking_tx_hash": "text",
      "accept_tx_hash": "text",
      "patient_fund_tx_hash": "text",
      "subsidy_fund_tx_hash": "text",
      "patient_checkin_tx_hash": "text",
      "therapist_checkin_tx_hash": "text",
      "complete_tx_hash": "text",
      "resolve_tx_hash": "text",
      "cancel_tx_hash": "text",
      "withdraw_tx_hash": "text",
      "subsidy_funded_eth": "numeric",
      "patient_refund_eth": "numeric",
      "vault_refund_eth": "numeric",
      "total_refund_eth": "numeric",
      "cancelled_unstarted_at": "timestamp with time zone",
      "cancelled_by_wallet": "text",
      "cancellation_reason": "text",
      "settlement_source": "text",
      "last_onchain_event": "text",
      "last_synced_block": "bigint",
      "last_synced_log_index": "integer",
      "sync_error": "text",
      "create_booking_tx_hash": "text",
      "accept_booking_tx_hash": "text",
      "reject_booking_tx_hash": "text",
      "fund_patient_tx_hash": "text",
      "fund_subsidy_tx_hash": "text",
      "cancel_unstarted_tx_hash": "text",
      "session_started_tx_hash": "text",
      "complete_session_tx_hash": "text",
      "resolve_payment_timeout_tx_hash": "text",
      "resolve_no_show_tx_hash": "text",
      "patient_withdrawal_tx_hash": "text",
      "therapist_withdrawal_tx_hash": "text",
      "vault_withdrawal_tx_hash": "text",
      "protocol_withdrawal_tx_hash": "text",
      "last_synced_tx_hash": "text",
      "last_synced_at": "timestamp with time zone",
      "chat_opened_at": "timestamp with time zone",
      "last_message_at": "timestamp with time zone",
      "message_count": "integer",
      "active_end_request_id": "uuid",
      "queue_entered_at": "timestamp with time zone",
      "estimated_ready_at": "timestamp with time zone",
      "queue_position": "integer",
      "patient_cancelled_waiting_at": "timestamp with time zone",
      "subsidy_refunded_eth": "numeric"
    },
    "primaryKey": "id",
    "foreignKeys": [
      {
        "column": "patient_wallet",
        "table": "patients",
        "references": "wallet_address"
      },
      {
        "column": "therapist_wallet",
        "table": "therapists",
        "references": "wallet_address"
      }
    ]
  },
  "activities": {
    "columns": {
      "id": "uuid",
      "wallet_address": "text",
      "title": "text",
      "description": "text",
      "status": "text",
      "created_at": "timestamp with time zone"
    },
    "primaryKey": "id",
    "foreignKeys": []
  },
  "therapist_auth_logs": {
    "columns": {
      "id": "uuid",
      "therapist_wallet": "text",
      "action": "text",
      "user_agent": "text",
      "created_at": "timestamp with time zone"
    },
    "primaryKey": "id",
    "foreignKeys": []
  },
  "chat_messages": {
    "columns": {
      "id": "uuid",
      "session_id": "uuid",
      "sender_wallet": "text",
      "sender_role": "text",
      "message_type": "text",
      "content": "text",
      "metadata": "jsonb",
      "is_deleted": "boolean",
      "created_at": "timestamp with time zone",
      "updated_at": "timestamp with time zone"
    },
    "primaryKey": "id",
    "foreignKeys": [
      {
        "column": "session_id",
        "table": "sessions",
        "references": "id"
      }
    ]
  },
  "chat_attachments": {
    "columns": {
      "id": "uuid",
      "message_id": "uuid",
      "session_id": "uuid",
      "uploader_wallet": "text",
      "mime_type": "text",
      "original_filename": "text",
      "storage_bucket": "text",
      "storage_path": "text",
      "byte_size": "bigint",
      "patient_download_allowed": "boolean",
      "therapist_view_allowed": "boolean",
      "therapist_download_allowed": "boolean",
      "therapist_view_expires_at": "timestamp with time zone",
      "created_at": "timestamp with time zone"
    },
    "primaryKey": "id",
    "foreignKeys": [
      {
        "column": "message_id",
        "table": "chat_messages",
        "references": "id"
      },
      {
        "column": "session_id",
        "table": "sessions",
        "references": "id"
      }
    ]
  },
  "session_end_requests": {
    "columns": {
      "id": "uuid",
      "session_id": "uuid",
      "requested_by_wallet": "text",
      "requested_by_role": "text",
      "target_wallet": "text",
      "target_role": "text",
      "status": "text",
      "requester_confirmed_at": "timestamp with time zone",
      "target_responded_at": "timestamp with time zone",
      "accepted_at": "timestamp with time zone",
      "declined_at": "timestamp with time zone",
      "cancelled_at": "timestamp with time zone",
      "expired_at": "timestamp with time zone",
      "target_response_text": "text",
      "requester_note": "text",
      "created_at": "timestamp with time zone",
      "updated_at": "timestamp with time zone",
      "receiver_seen_at": "timestamp with time zone",
      "modal_presented_at": "timestamp with time zone",
      "notification_sent_at": "timestamp with time zone"
    },
    "primaryKey": "id",
    "foreignKeys": [
      {
        "column": "session_id",
        "table": "sessions",
        "references": "id"
      }
    ]
  },
  "support_requests": {
    "columns": {
      "id": "uuid",
      "session_id": "uuid",
      "reporter_wallet": "text",
      "reporter_role": "text",
      "issue_type": "text",
      "message": "text",
      "status": "text",
      "created_at": "timestamp with time zone"
    },
    "primaryKey": "id",
    "foreignKeys": [
      {
        "column": "session_id",
        "table": "sessions",
        "references": "id"
      }
    ]
  }
};
